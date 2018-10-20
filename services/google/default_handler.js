
const { Permission } = require("actions-on-google");

exports.defaultHandler =  (conv) => {
      return conv.ask(new Permission({
          context: 'Welcome to Leo Voice center . '
          , permissions: ['NAME', 'DEVICE_PRECISE_LOCATION'],
      }));
  };

