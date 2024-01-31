/* craco.config.ts */
const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "assets": path.resolve(__dirname, "src/assets"),
            "components": path.resolve(__dirname, "src/components"),
            "contexts": path.resolve(__dirname, "src/contexts"),
            "constants": path.resolve(__dirname, "src/constants"),
            "hooks": path.resolve(__dirname, "src/hooks"),
            "styles": path.resolve(__dirname, "src/styles"),
            "types": path.resolve(__dirname, "src/types"),
            "utils": path.resolve(__dirname, "src/utils")
        }
    },
};
