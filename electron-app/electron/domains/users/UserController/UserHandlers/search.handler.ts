/**
 * Search Users Handler
 */
import { SearchUsersService } from '../../UserService/Services/search.service.js';

export class SearchUsersHandler {
  constructor(private searchUsersService: SearchUsersService) {}

  async handleSearch(event: Electron.IpcMainInvokeEvent, query: string) {
    console.log('📥 Search users endpoint llamado con query:', query);
    return this.searchUsersService.search(query);
  }
} 