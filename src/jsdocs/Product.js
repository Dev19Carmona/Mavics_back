/**
 * SecondParamFilterProduct
 * @typedef {Object} SecondParamFilterProduct
 * @property {Product_Filter} filter Product_Filters
 * @property {boolean} count Count
 * 
 */

/**
 * Product_Filter
 * @typedef {Object} Product_Filter
 * @property {string} [_id] Product_id
 * @property {string} [name] Product_name
 * @property {Number} [price] Product_price
 * @property {Number} [amount] Product_amount
 * @property {boolean} [isAvailable] Product_isAvailable
 * @property {boolean} [isRemove] Product_isRemove
 * @property {string} [search] Product_search
 */

/**
 * Product
 * @typedef {Object} Product
 * @property {string} _id Product__id
 * @property {string} name Product_name
 * @property {Number} price Product_price
 * @property {Number} amount Product_amount
 * @property {boolean} isRemove Product_isRemove
 * @property {boolean} isAvailable Product_isAvailable
 * @property {Array<Tag>} tags Product_tags
 * @property {string} urlImage Product_urlImage
 * @property {string} supplierId Product_supplierId
 * @property {string} [createdAt] Product_createdAt
 * @property {string} [updatedAt] Product_updatedAt
 * 
 */
/**
 * Tag
 * @typedef {Object} Tag
 * @property {string} _id Product__id
 * @property {string} name Product_name
 * @property {boolean} [isRemove] Product_isRemove
 * @property {string} [createdAt] Product_createdAt
 * @property {string} [updatedAt] Product_updatedAt
 */

/**
 * Product_QueryObject
 * @typedef {Object} Product_QueryObject
 * @property {boolean} isRemove
 * @property {Object} [name]
 */

/**
 * Upload
 * @typedef {Object} Upload
 * @property {string} filename - El nombre del archivo.
 * @property {string} mimetype - El tipo MIME del archivo.
 * @property {number} encoding - La codificación del archivo.
 * @property {ReadableStream} createReadStream - Una función para crear un flujo de lectura del archivo.
 */

/**
 * Product_data
 * @typedef {Object} Product_data
 * @property {string} [_id] Product_data_id
 * @property {string} [name] Product_data_name
 * @property {Number} [price] Product_data_price
 * @property {Number} [amount] Product_data_amount
 * @property {Upload} [image] Product_data_image
 * @property {string} [supplierId] Product_data_supplierId
 * @property {Array<Tag_data>} [tags] Product_data_tags
 */

/**
 * Tag_data
 * @typedef {Object} Tag_data
 * @property {string} [_id] Tag_data_id
 * @property {string} [name] Tag_data_name
 * @property {string} [isRemove] Tag_data_isRemove
 */

/**
 * SecondParamSaveProduct
 * @typedef {Object} SecondParamSaveProduct
 * @property {Product_data} data Data
 * 
 */

