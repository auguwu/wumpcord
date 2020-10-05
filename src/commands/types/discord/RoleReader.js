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

const ArgumentTypeReader = require('../../arguments/ArgumentTypeReader');
const Regex = /^(?:<@&)?([0-9]+)>?$/;

/**
 * @extends {ArgumentTypeReader<import('../../../entities/Role')>}
 */
module.exports = class RoleTypeReader extends ArgumentTypeReader {
  constructor(client) {
    super(client, 'role');
  }

  /**
   * @param {import('../../CommandContext')} ctx The command's context
   * @param {string} val The raw value
   * @param {import('../../arguments/Argument')} arg The argument
   * @returns {MaybePromise<boolean>}
   */
  async validate(ctx, val, arg) {
    if (!this.client.canCache('member:role')) return false;
    if (!ctx.guild) return false;

    const matches = val.match(Regex);
    if (matches) return ctx.guild.roles.has(matches[2]);

    const match1 = ctx.guild.roles.filter(role => role.name.toLowerCase() === val.toLowerCase());
    if (match1.length) {
      if (arg.oneOf.length && !arg.oneOf.includes(match1[0].id)) return false;
      return true;
    }

    const match2 = ctx.guild.roles.filter(role => role.name.toLowerCase().includes(val.toLowerCase()));
    if (match2.length) {
      if (arg.oneOf.length && !arg.oneOf.includes(match2[0].id)) return false;
      return true;
    }

    return false;
  }

  /**
   * @param {import('../../CommandContext')} ctx The command's context
   * @param {string} val The raw value
   * @param {import('../../arguments/Argument')} arg The argument
   * @returns {MaybePromise<import('../../../entities/Role')>}
   */
  async parse(ctx, val, arg) {
    if (!this.client.canCache('member:role')) return null;
    if (!ctx.guild) return null;

    const matches = val.match(Regex);
    if (matches) return ctx.guild.roles.get(matches[2]) || null;

    const match1 = ctx.guild.roles.filter(role => role.name.toLowerCase() === val.toLowerCase());
    if (match1.length) return match1[0];

    const match2 = ctx.guild.roles.filter(role => role.name.toLowerCase().includes(val.toLowerCase()));
    if (match2.length) return match2[0];

    return false;
  }
};

/**
 * @typedef {import('../../arguments/ArgumentTypeReader').MaybePromise<T>} MaybePromise
 * @template T
 */
