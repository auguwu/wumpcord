/**
 * Copyright (c) 2020-2021 August
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

import type { GatewayGuildRoleDeleteDispatchData } from 'discord-api-types';
import type { PartialEntity } from '../../../types';
import { Guild, GuildRole } from '../../../models';
import Event from '../../Event';

interface GuildRoleDeleteRefs {
  guild: PartialEntity<Guild>;
  role: PartialEntity<GuildRole>;
}

export default class GuildRoleDeleteEvent extends Event<GatewayGuildRoleDeleteDispatchData, GuildRoleDeleteRefs> {
  get guild() {
    return this.$refs.guild;
  }

  get role() {
    return this.$refs.role;
  }

  process() {
    const guild = this.client.guilds.get(this.data.guild_id) ?? { id: this.data.guild_id };
    if (guild instanceof Guild) {
      const role = guild.roles.get(this.data.role_id);
      if (role !== null) guild.roles.remove(role);

      this.$refs = {
        role: role ?? { id: this.data.role_id },
        guild
      };

      return;
    }

    this.$refs = {
      role: { id: this.data.role_id },
      guild
    };
  }
}
