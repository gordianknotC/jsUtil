import { setupCurrentEnv, _currentEnv, Env } from "@/extension/extension_setup";
import { Color, strip } from "colors";

export type ColorNames = keyof Color;

/** LogRecord 暫時用來除錯的型別 */
export type LogRecord = {
  /** 所有 stack */
  allStacks: string[];
  /** lbound/rbound 處理後顥示的 stack */
  stacksOnDisplay: string[];
  lBound: number;
  rBound: number;
  moduleName: string;
  message: string[];
};

/** 
* @typeParam M - module name 
* @example 
  ```ts
  enum EModules {
    Test = "Test",
    Hobbits = "Hobbits",
  }
  const testModule: AllowedModule = {
    moduleName: EModules.Test,
    disallowedHandler: (l)=> l <= ELevel.info
  }
  ```
*/
export type AllowedModule<M> = {
  /** module identifier */
  moduleName: M;
  /** 判斷哪一層級的 {@link ELevel} 不被允許 */
  disallowedHandler: (level: ELevel) => boolean;
  /** 用來覆寫當前 log level, 預設為保持不變： (level)=>level */
  logLevelHandler?: (level: ELevel)=> ELevel;
};

/** 內部使用 */
export type RawAllowedLogger<M extends string> = Record<M, AllowedModule<M>>;


/** 內部使用 */
export type RawAllowedLoggerByEnv<M extends string> = {
  production?: Partial<RawAllowedLogger<M>>;
  release?: Partial<RawAllowedLogger<M>>;
  develop: Partial<RawAllowedLogger<M>>;
  test: Partial<RawAllowedLogger<M>>;
};

/** 
 * @see {@link AllowedModule} 
 * @typeParam M - module name 
*/
export type AllowedLoggerByEnv<M extends string> = {
  production?: AllowedModule<M>[];
  release?: AllowedModule<M>[];
  develop: AllowedModule<M>[];
  test: AllowedModule<M>[];
};

export type LogOption = {
  /** 預設為3，由現在的 trace stack 中，回算第幾個stack 作為起點
   * 因為實作上的理由所以預設是3
   * (message > logger > _messenger > whereUserInvokingLogs)
   * 1          2        3            4
   * ^----------^--------^------------^
   * */
  traceAt?: number;
  /** 要顯示多少層的 error stacks */
  stackNumber?: number;
};

/**
TRACE.
DEBUG.
INFO.
WARN.
ERROR.
FATAL.
OFF.
 */
export enum ELevel {
  trace,
  debug,
  info,
  warn,
  current,
  error,
  fatal,
}

export type ColorConfig = Record<ELevel, (msg: string) => string>;

export
abstract class LoggerMethods {
  abstract log(msg: any[], option?: LogOption): void;
  abstract trace(msg: any[], option?: LogOption): void;
  abstract info(msg: any[], option?: LogOption): void;
  abstract debug(msg: any[], option?: LogOption): void;
  abstract error(msg: any[], option?: LogOption): void;
  abstract fatal(msg: any[], option?: LogOption): void;
  abstract warn(msg: any[], option?: LogOption): void;
  abstract current(msg: any[], option?: LogOption): void;
}

abstract class LoggerStatic {
  abstract setCurrentEnv(envGetter: ()=>Env): void;
  abstract isDisallowed(option: AllowedModule<any>, level: ELevel): boolean;
  abstract  isAllowed(option?: AllowedModule<any>, level?: ELevel): boolean ;
  abstract toAllowedLogger<M extends string>(modules: AllowedModule<M>[]): RawAllowedLogger<M>;
  abstract setLevelColors(option: Partial<ColorConfig>): void;
  abstract  setLoggerAllowance<M extends string>(modules: AllowedModule<M>[]): RawAllowedLogger<M>;
  abstract setLoggerAllowanceByEnv<M extends string>(option: AllowedLoggerByEnv<M>): Partial<RawAllowedLogger<M>>;
  abstract hasModule<M>(option: AllowedModule<M>):boolean;
  abstract clearModules(): void;
}

export type LoggerAllowanceMode = "ByEnv" | "IgnoreEnv";

