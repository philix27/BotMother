import * as devalue from 'devalue';
import { persisted } from 'svelte-persisted-store';

// third parameter is options
export function appPersistWritable<T>(key: string, defaultValue: T) {
	return persisted<T>('local-storage-key', defaultValue, {
		serializer: devalue, // defaults to `JSON`
		storage: 'session', // 'session' for sessionStorage, defaults to 'local'
		syncTabs: true, // choose whether to sync localStorage across tabs, default is true
		onWriteError: (error) => {
			/* handle or rethrow */
		}, // Defaults to console.error with the error object
		onParseError: (raw, error) => {
			/* handle or rethrow */
		}, // Defaults to console.error with the error object
		beforeRead: (value) => {
			/* change value after serialization but before setting store to return value*/
			return value;
		},
		beforeWrite: (value) => {
			/* change value after writing to store, but before writing return value to local storage*/
			return value;
		}
	});
}
