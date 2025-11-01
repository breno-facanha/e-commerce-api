const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/aws-s3");
const { ProductsImages } = require("../models");

async function uploadFileToS3(file) {
    const fileName = `products/${Date.now()}-${file.originalname}`;
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    });

    await s3Client.send(command);

    const region = process.env.AWS_REGION || 'us-east-1';
    const bucket = process.env.AWS_S3_BUCKET;
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;

    return url;
}


/** 
 * Processa o upload de multiplas imagens de produtos para o AWS S3.
 * @param {Array} files - Array de arquivos de imagem a serem enviados.
 * @returns {Promise<Array>} - Resolve quando todas as imagens forem processadas.
 *  */

async function processMultipleImageUpload(files) {
    if (!files || files.length === 0) {
        return [];
    }
    
   const uploadPromises = files.map((file) => uploadFileToS3(file));
   const urls = await Promise.all(uploadPromises);
   return urls; // Retorna um array com as URLs das imagens no S3 ou objetos de arqui
}

/**
 * Salva as imagens na tabela ProductImages.
 * @param {String} productId - ID do produto ao qual as imagens pertencem.
 * @param {Array} urls - Array de arquivos de imagem processados.
 * @returns {Promise<Array>} - Resolve quando todas as imagens forem salvas no banco de dados.
 */

async function saveProductImages(productId, urls) {
   if (!urls || urls.length === 0) {
        return [];
   }

   const imagesData = urls.map(image => ({
        product_id: productId,
        url: image // Supondo que 'location' contém a URL da imagem no S3
   }));

   const savedImages = await ProductsImages.bulkCreate(imagesData); 
    return savedImages;
}

/**
 * Processa o upload completo: faz o upload no s3 e salva no banco de dados.
 * @param {String} productId - ID do produto ao qual as imagens pertencem.
 * @param {Array} files - array de arquivos de imagem a serem enviados.
 * @returns {Promise<Array>} - Resolve quando todas as imagens forem processadas e salvas.
 */

async function uploadAndSaveProductImages(productId, files) {
    try {
        const urls = await processMultipleImageUpload(files);
        const images = await saveProductImages(productId, urls);
        return images;
    } catch (error) {
        throw new Error(error.message || "Erro no upload das imagens.");
    }
}

module.exports = {
    processMultipleImageUpload,
    saveProductImages,
    uploadAndSaveProductImages,
    uploadFileToS3
}