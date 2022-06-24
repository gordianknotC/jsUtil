/**
 *      B A S E
 *
 * */
export { UnCaughtCondition, UncaughtEnumType, NotImplementedError, TypeMismatchError, InvalidUsage, UnExpectedRole } from "./base/baseExceptions";
/***
 *
 *    E X T E N D
 *    B A S E
 * */
export { AssertMsg, AssertionError, assert, } from "./utils/assert";
export { isRefImpl, asEnum, getAccessibleProperties, asCascadeClass, asUnWrappedVueRefMap, UnWrappedVueRef, addStringMappingFromNumEnum, Is, } from "./utils/typeInferernce";
/**
 *        M I X I N S
 *
 *
 * */
export { useBuiltIn } from "./base/builtinTypes";
export { assertMsg } from "./utils/assert";
export { is } from "./utils/typeInferernce";
export { IFacade, injectFacade, CommonMixin } from "./vueMixins/common";
//# sourceMappingURL=index.js.map