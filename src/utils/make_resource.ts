/* eslint-disable prettier/prettier */
import { JSResourceReference } from 'react-relay';

export default function JSResource<T>(
  moduleId: string,
  loader: () => Promise<T>
): JSResourceReference<T> {
  let resource = Resource.map.get(moduleId) as Resource<T> | undefined;

  if (!resource) {
    resource = new Resource(moduleId, loader);
    Resource.map.set(moduleId, resource);
  }

  return resource;
}

class Resource<T> implements JSResourceReference<T> {
  public static map: Map<string, Resource<unknown>> = new Map();

  private _moduleId: string;
  private _loader: () => Promise<T>;
  private _loadingPromise: Promise<T> | null = null;
  private _module: T | null = null;

  constructor(moduleId: string, loader: () => Promise<T>) {
    this._moduleId = moduleId;
    this._loader = loader;
  }

  getModuleId(): string {
    return this._moduleId;
  }

  getModuleIfRequired(): T | null {
    return this._module;
  }

  preload(): void {
    this.load();
  }

  load(): Promise<T> {
    if (!this._loadingPromise) {
      this._loadingPromise = this._loader()
        .then((module) => {
          this._module = module;
          return module;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
    return this._loadingPromise;
  }
}

