import "./styles.css";
import { useFetch } from "./api";
import { TimerModule } from "./modules/timer.module";

useFetch({ url: "https://jsonplaceholder.typicode.com/albums" });

const timer = new TimerModule();
