import fs from 'fs';

/**
 * Read the entire contents of a file
 *
 * @param {string|Buffer|number} path Filename or file descriptor
 * @param {string|null} [encoding='utf8'] The expected file encoding
 *
 * @returns {Promise<string|Buffer>} Contents of the file
 */
function read(path, encoding = 'utf8') {
  return fs.promises.readFile(path, { encoding });
}

export default { read };
