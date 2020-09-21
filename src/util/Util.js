/**
 * Copyright (c) 2020 August
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * External utilities made for development purposes
 */
module.exports = class Utilities {
  constructor() {
    throw new SyntaxError('Wumpcord.Utilities is not made to be a constructable-class; please refrain using `new`.');
  }

  /**
   * Gets an option from an object
   * @template T The object itself
   * @template U The default value, if any
   * @param {keyof T} prop The property to find
   * @param {U} defaultValue The default value
   * @param {T} [options] The options to use
   * @returns {U} The value itself or the default value if not found
   * @arity Wumpcord.Utilities.getOption/3
   */
  static get(prop, defaultValue, options) {
    if (options === undefined || options === null) return defaultValue;
    else if (options.hasOwnProperty(prop)) return options[prop];
    else return defaultValue;
  }

  /**
   * Halts the process asynchronously for an amount of time
   * @param {number} ms The number of milliseconds to halt the process
   * @arity Wumpcord.Utilities.sleep/1
   */
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Formats the allowed mentions property
   * @param {import('../gateway/WebSocketClient').ClientOptions} options The client options
   * @param {import('../gateway/WebSocketClient').AllowedMentions} allowed The allowed options
   * @arity Wumpcord.Utilities.formatAllowedMentions/2
   */
  static formatAllowedMentions(options, allowed) {
    if (!allowed) return options.allowedMentions;

    const result = { parse: [] };
    if (allowed.everyone) result.parse.push('everyone');

    if (allowed.roles === true) result.parse.push('roles');
    else if (Array.isArray(allowed.roles)) {
      if (allowed.roles.length > 100) throw new TypeError('Allowed role mentions can\'t go over 100');

      result.roles = allowed.roles;
    }

    if (allowed.users === true) result.parse.push('users');
    else if (Array.isArray(allowed.users)) {
      if (allowed.users.length > 100) throw new TypeError('Allowed users mentions can\'t go over 100');

      result.users = allowed.users;
    }

    return result;
  }

  /**
   * Merges 2 objects into a huge one
   * @template T The original object
   * @template U The object that is returned
   * @param {...T} items The objects to merge
   * @returns {U} The merged object
   * @arity Wumpcord.Utilities.merge/1
   */
  static merge(...items) {
    const obj = {};
    for (let i = 0; i < items.length; i++) {
      for (const k in items[i]) {
        if (!obj.hasOwnProperty(k)) obj[k] = items[i][k];
      }
    }

    return obj;
  }
};
