#!/usr/bin/env node
import { program } from 'commander';
import { COMMAND_NAME, PACKAGE_VERSION } from './config';

program
  .name(COMMAND_NAME)
  .version(PACKAGE_VERSION, '-v, --version')
  .showHelpAfterError()
  .description('2024年春晚刘谦撕牌魔术过程 nodejs + typescrit 实现')
  .parse(process.argv);
