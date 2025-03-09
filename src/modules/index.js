import { BackgroundModule } from "./background.module";
import { ClicksModule } from "./clicks.module";
import { MessageModule } from "./message.modules";
import { ShapeModule } from "./shape.module";
import { SoundModule } from "./sound.module";
import { TimerModule } from "./timer.module";
import { WordsModule } from "./words.module";

export const modules = [new BackgroundModule(),new ClicksModule(3), new MessageModule(),new TimerModule(), new ShapeModule(), new SoundModule(), new WordsModule()]