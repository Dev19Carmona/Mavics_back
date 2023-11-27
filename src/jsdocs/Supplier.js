/**
 * SecondParamFilterSupplier
 * @typedef {Object} SecondParamFilterSupplier
 * @property {Supplier_Filter} filter Filters
 * @property {boolean} count Count
 * 
 */

/**
 * Supplier_Filter
 * @typedef {Object} Supplier_Filter
 * @property {string} [_id] Supplier_id
 * @property {string} [name] Supplier_name
 * @property {string} [search] Supplier_search
 */

/**
 * Supplier
 * @typedef {Object} Supplier
 * @property {string} _id Supplier__id
 * @property {string} name Supplier_name
 * @property {string} phone Supplier_phone
 * @property {string} nit Supplier_nit
 * @property {string} manager Supplier_manager
 * @property {boolean} isActive Supplier_isActive
 * @property {boolean} isRemove Supplier_isRemove
 * @property {string} [createdAt] Supplier_createdAt
 * @property {string} [updatedAt] Supplier_updatedAt
 * 
 */


/**
 * Query Supplier
 * @typedef {Object} Supplier_QueryObject
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
 * Supplier_data
 * @typedef {Object} Supplier_data
 * @property {string} [_id] Supplier_data_id
 * @property {string} [name] Supplier_data_name
 * @property {string} [phone] Supplier_data_price
 * @property {string} [nit] Supplier_data_amount
 * @property {string} [manager] Supplier_data_image
 */

/**
 * SecondParamSaveSupplier
 * @typedef {Object} SecondParamSaveSupplier
 * @property {Supplier_data} data Data
 * 
 */

