import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: ['@popperjs/core', '@servoy/jw-bootstrap-switch-ng2']
    }
  }
});
