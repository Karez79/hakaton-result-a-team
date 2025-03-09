import { BackgroundModule } from "./background.module";
import { ClicksModule } from "./clicks.module";
import { MessageModule } from "./message.modules";
import { TimerModule } from "./timer.module";

export const modules = [new BackgroundModule(),new ClicksModule(), new MessageModule(),new TimerModule()]