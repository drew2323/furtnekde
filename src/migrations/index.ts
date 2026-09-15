import * as migration_20260912_083459_initial from './20260912_083459_initial';
import * as migration_20260914_091817_pages_collection from './20260914_091817_pages_collection';
import * as migration_20260914_105504_landing_pages from './20260914_105504_landing_pages';
import * as migration_20260914_171505_initial_visual_prototype from './20260914_171505_initial_visual_prototype';
import * as migration_20260914_174219 from './20260914_174219';

export const migrations = [
  {
    up: migration_20260912_083459_initial.up,
    down: migration_20260912_083459_initial.down,
    name: '20260912_083459_initial',
  },
  {
    up: migration_20260914_091817_pages_collection.up,
    down: migration_20260914_091817_pages_collection.down,
    name: '20260914_091817_pages_collection',
  },
  {
    up: migration_20260914_105504_landing_pages.up,
    down: migration_20260914_105504_landing_pages.down,
    name: '20260914_105504_landing_pages',
  },
  {
    up: migration_20260914_171505_initial_visual_prototype.up,
    down: migration_20260914_171505_initial_visual_prototype.down,
    name: '20260914_171505_initial_visual_prototype',
  },
  {
    up: migration_20260914_174219.up,
    down: migration_20260914_174219.down,
    name: '20260914_174219'
  },
];
