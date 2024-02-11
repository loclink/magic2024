import { runAction } from '@/actions';
import { program } from 'commander';

export const registerCommands = () => {
  program.command('run').description('执行魔术模拟过程').action(runAction);
};
