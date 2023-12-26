import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'login',
  exposes: {
    // './Routes': 'apps/login/src/app/remote-entry/entry.routes.ts',
    './Module': 'apps/login/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
