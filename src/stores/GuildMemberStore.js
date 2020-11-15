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

const GuildMember = require('../entities/GuildMember');
const BaseStore = require('./BaseStore');

/** @extends {BaseStore<GuildMember>} */
module.exports = class GuildMemberStore extends BaseStore {
  /**
   * Creates a new [GuildMemberStore] instance
   * @param {import('../gateway/WebSocketClient')} client The WebSocket client instance
   */
  constructor(client) {
    super(
      client,
      GuildMember,
      client.canCache('member'),
      true
    );
  }

  /**
   * Fetches new data for a [GuildMember] and updates cache in real-time
   * @param {string} guildID The guild's ID
   * @param {string} memberID The member's ID
   */
  fetch(guildID, memberID) {
    return this.client.getGuildMember(guildID, memberID)
      .then(member => this.add(member));
  }
};
