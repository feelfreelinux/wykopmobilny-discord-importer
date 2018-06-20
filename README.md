# wykopmobilny-discord-importer
This is a simple nodejs program that imports new entries from wykop.pl tags specified in config file.

Currently used for [WykopMobilny](https://github.com/feelfreelinux/WykopMobilny) and running under #owmbugi and #otwartywykopmobilny tags.

# config
```json
{
  "key": "wykopkey",
  "secret": "secretkey",
  "discordToken": "discordbottoken",
  "tags": {
    "wykoptag": "channeliddiscord",
    ...
  }
}
```

Licensed under MIT license.