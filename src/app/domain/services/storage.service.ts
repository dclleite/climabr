import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setData(key: string, value: any) {
    return this._storage.set(key, value);
  }

  getData(key: string) {
    return this._storage.get(key);
  }

  removeData(key: string) {
    return this._storage.remove(key);
  }
}
