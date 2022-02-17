"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_castToInterface(obj, cls) {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
}
function $rt_castToClass(obj, cls) {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
}
Array.prototype.fill = Array.prototype.fill || function(value, start, end) {
    var len = this.length;
    if (!len) return this;
    start = start | 0;
    var i = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    end = end === undefined ? len : end | 0;
    end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
    for (;i < end;i++) {
        this[i] = value;
    }
    return this;
};
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    data.fill(null);
    return new $rt_array(cls, data);
}
function $rt_createArrayFromData(cls, init) {
    return $rt_wrapArray(cls, init);
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
var $rt_createLongArray;
var $rt_createLongArrayFromData;
if (typeof BigInt64Array !== 'function') {
    $rt_createLongArray = function(sz) {
        var data = new Array(sz);
        var arr = new $rt_array($rt_longcls(), data);
        data.fill(Long_ZERO);
        return arr;
    };
    $rt_createLongArrayFromData = function(init) {
        return new $rt_array($rt_longcls(), init);
    };
} else {
    $rt_createLongArray = function(sz) {
        return $rt_createNumericArray($rt_longcls(), new BigInt64Array(sz));
    };
    $rt_createLongArrayFromData = function(data) {
        var buffer = new BigInt64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_longcls(), buffer);
    };
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createCharArrayFromData(data) {
    var buffer = new Uint16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_charcls(), buffer);
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createByteArrayFromData(data) {
    var buffer = new Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_bytecls(), buffer);
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createShortArrayFromData(data) {
    var buffer = new Int16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_shortcls(), buffer);
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createIntArrayFromData(data) {
    var buffer = new Int32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_intcls(), buffer);
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createBooleanArrayFromData(data) {
    var buffer = new Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_booleancls(), buffer);
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createFloatArrayFromData(data) {
    var buffer = new Float32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_floatcls(), buffer);
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_createDoubleArrayFromData(data) {
    var buffer = new Float64Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_doublecls(), buffer);
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
var $rt_javaExceptionProp = Symbol("javaException");
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_stecls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
function $rt_createOutputFunction(printFunction) {
    var buffer = "";
    var utf8Buffer = 0;
    var utf8Remaining = 0;
    function putCodePoint(ch) {
        if (ch === 0xA) {
            printFunction(buffer);
            buffer = "";
        } else if (ch < 0x10000) {
            buffer += String.fromCharCode(ch);
        } else {
            ch = ch - 0x10000 | 0;
            var hi = (ch >> 10) + 0xD800;
            var lo = (ch & 0x3FF) + 0xDC00;
            buffer += String.fromCharCode(hi, lo);
        }
    }
    return function(ch) {
        if ((ch & 0x80) === 0) {
            putCodePoint(ch);
        } else if ((ch & 0xC0) === 0x80) {
            if (utf8Buffer > 0) {
                utf8Remaining <<= 6;
                utf8Remaining |= ch & 0x3F;
                if ( --utf8Buffer === 0) {
                    putCodePoint(utf8Remaining);
                }
            }
        } else if ((ch & 0xE0) === 0xC0) {
            utf8Remaining = ch & 0x1F;
            utf8Buffer = 1;
        } else if ((ch & 0xF0) === 0xE0) {
            utf8Remaining = ch & 0x0F;
            utf8Buffer = 2;
        } else if ((ch & 0xF8) === 0xF0) {
            utf8Remaining = ch & 0x07;
            utf8Buffer = 3;
        }
    };
}
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(function(msg) {
    console.info(msg);
}) : function() {
};
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(function(msg) {
    console.error(msg);
}) : function() {
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            var enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            var declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            var simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_wrapFunction0(f) {
    return function() {
        return f(this);
    };
}
function $rt_wrapFunction1(f) {
    return function(p1) {
        return f(this, p1);
    };
}
function $rt_wrapFunction2(f) {
    return function(p1, p2) {
        return f(this, p1, p2);
    };
}
function $rt_wrapFunction3(f) {
    return function(p1, p2, p3) {
        return f(this, p1, p2, p3, p3);
    };
}
function $rt_wrapFunction4(f) {
    return function(p1, p2, p3, p4) {
        return f(this, p1, p2, p3, p4);
    };
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
var $rt_doubleToLongBits;
var $rt_longBitsToDouble;
if (typeof BigInt !== 'function') {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
    };
    $rt_longBitsToDouble = function(n) {
        $rt_numberConversionView.setInt32(0, n.lo, true);
        $rt_numberConversionView.setInt32(4, n.hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
} else {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        var lo = $rt_numberConversionView.getInt32(0, true);
        var hi = $rt_numberConversionView.getInt32(4, true);
        return BigInt.asIntN(64, BigInt.asUintN(32, BigInt(lo)) | BigInt(hi) << BigInt(32));
    };
    $rt_longBitsToDouble = function(n) {
        var hi = Number(BigInt.asIntN(32, n >> BigInt(32)));
        var lo = Number(BigInt.asIntN(32, n & BigInt(0xFFFFFFFF)));
        $rt_numberConversionView.setInt32(0, lo, true);
        $rt_numberConversionView.setInt32(4, hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
var Long_MAX_NORMAL = 1 << 18;
var Long_ZERO;
var Long_create;
var Long_fromInt;
var Long_fromNumber;
var Long_toNumber;
var Long_hi;
var Long_lo;
if (typeof BigInt !== "function") {
    Long.prototype.toString = function() {
        var result = [];
        var n = this;
        var positive = Long_isPositive(n);
        if (!positive) {
            n = Long_neg(n);
        }
        var radix = new Long(10, 0);
        do  {
            var divRem = Long_divRem(n, radix);
            result.push(String.fromCharCode(48 + divRem[1].lo));
            n = divRem[0];
        }while (n.lo !== 0 || n.hi !== 0);
        result = (result.reverse()).join('');
        return positive ? result : "-" + result;
    };
    Long.prototype.valueOf = function() {
        return Long_toNumber(this);
    };
    Long_ZERO = new Long(0, 0);
    Long_fromInt = function(val) {
        return new Long(val,  -(val < 0) | 0);
    };
    Long_fromNumber = function(val) {
        if (val >= 0) {
            return new Long(val | 0, val / 0x100000000 | 0);
        } else {
            return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
        }
    };
    Long_create = function(lo, hi) {
        return new Long(lo, hi);
    };
    Long_toNumber = function(val) {
        return 0x100000000 * val.hi + (val.lo >>> 0);
    };
    Long_hi = function(val) {
        return val.hi;
    };
    Long_lo = function(val) {
        return val.lo;
    };
} else {
    Long_ZERO = BigInt(0);
    Long_create = function(lo, hi) {
        return BigInt.asIntN(64, BigInt.asUintN(32, BigInt(lo)) | BigInt(hi) << BigInt(32));
    };
    Long_fromInt = function(val) {
        return BigInt(val);
    };
    Long_fromNumber = function(val) {
        return BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val));
    };
    Long_toNumber = function(val) {
        return Number(val);
    };
    Long_hi = function(val) {
        return Number(BigInt.asIntN(64, val >> BigInt(32))) | 0;
    };
    Long_lo = function(val) {
        return Number(BigInt.asIntN(32, val)) | 0;
    };
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    return (a >>> 0) / (b >>> 0) >>> 0;
};
var $rt_umod = function(a, b) {
    return (a >>> 0) % (b >>> 0) >>> 0;
};
function $rt_checkBounds(index, array) {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkUpperBound(index, array) {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkLowerBound(index) {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_classWithoutFields(superclass) {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
}
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_stecls() {
    return jl_Object;
}
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
function $rt_throwAIOOBE() {
}
function $rt_throwCCE() {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object__init_0($this) {}
function jl_Object_getClass($this) {
    var var$1, var$2, var$3;
    var$1 = $this.constructor;
    if (var$1 === null)
        var$2 = null;
    else {
        var$2 = var$1.classObject;
        if (var$2 === null) {
            var$2 = new jl_Class;
            var$2.$platformClass = var$1;
            var$3 = var$2;
            var$1.classObject = var$3;
        }
    }
    return var$2;
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = new jl_StringBuilder;
    var$1.$buffer = $rt_createCharArray(16);
    var$2 = $this.constructor;
    if (var$2 === null)
        var$3 = null;
    else {
        var$3 = var$2.classObject;
        if (var$3 === null) {
            var$3 = new jl_Class;
            var$3.$platformClass = var$2;
            var$4 = var$3;
            var$2.classObject = var$4;
        }
    }
    if (var$3.$name === null)
        var$3.$name = $rt_str(var$3.$platformClass.$meta.name);
    var$2 = var$3.$name;
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$2);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(0));
    var$2 = $this;
    if (!var$2.$id$) {
        var$4 = $rt_nextId();
        var$2.$id$ = var$4;
    }
    var$2 = otci_IntegerUtil_toUnsignedLogRadixString($this.$id$, 4);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$2);
    var$2 = new jl_String;
    var$5 = var$1.$buffer;
    var$6 = var$1.$length;
    var$7 = $rt_createCharArray(var$6);
    var$8 = var$7.data;
    var$2.$characters = var$7;
    var$9 = 0;
    while (var$9 < var$6) {
        var$8[var$9] = var$5.data[var$9 + 0 | 0];
        var$9 = var$9 + 1 | 0;
    }
    return var$2;
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Object_clone($this) {
    var $result, var$2, var$3;
    if (!$rt_isInstance($this, jl_Cloneable) && $this.constructor.$meta.item === null) {
        $result = new jl_CloneNotSupportedException;
        $result.$suppressionEnabled = 1;
        $result.$writableStackTrace = 1;
        $rt_throw($result);
    }
    $result = otp_Platform_clone($this);
    var$2 = $result;
    var$3 = $rt_nextId();
    var$2.$id$ = var$3;
    return $result;
}
var nles_IntegratedServer = $rt_classWithoutFields();
function nles_IntegratedServer_main($args) {
    var var$2, var$3, var$4, var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$args = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_84_0;
        jl_Integer_TYPE = $rt_cls($rt_intcls());
        $args = $rt_createArray(jl_String, 1);
        $args.data[0] = $rt_s(1);
        nles_VFile_altPathSeperator = $args;
        jl_Character_TYPE = $rt_cls($rt_charcls());
        jl_Character_characterCache = $rt_createArray(jl_Character, 128);
        var$2 = new nles_BooleanResult;
        var$2.$bool = 1;
        nles_BooleanResult_TRUE = var$2;
        var$2 = new nles_BooleanResult;
        var$2.$bool = 0;
        nles_BooleanResult_FALSE = var$2;
        otcic_StdoutOutputStream_INSTANCE = new otcic_StdoutOutputStream;
        var$2 = new jnci_UTF8Charset;
        $args = $rt_createArray(jl_String, 0);
        var$3 = $args.data;
        jnc_Charset_checkCanonicalName($rt_s(2));
        var$4 = var$3.length;
        var$5 = 0;
        while (var$5 < var$4) {
            jnc_Charset_checkCanonicalName(var$3[var$5]);
            var$5 = var$5 + 1 | 0;
        }
        var$2.$canonicalName = $rt_s(2);
        var$2.$aliases = $args.$clone();
        jnci_UTF8Charset_INSTANCE = var$2;
        var$2 = new jnc_CodingErrorAction;
        var$2.$name0 = $rt_s(3);
        jnc_CodingErrorAction_IGNORE = var$2;
        var$2 = new jnc_CodingErrorAction;
        var$2.$name0 = $rt_s(4);
        jnc_CodingErrorAction_REPLACE = var$2;
        var$2 = new jnc_CodingErrorAction;
        var$2.$name0 = $rt_s(5);
        jnc_CodingErrorAction_REPORT = var$2;
        var$2 = new jnc_CoderResult;
        var$2.$kind = 0;
        var$2.$length0 = 0;
        jnc_CoderResult_UNDERFLOW = var$2;
        var$2 = new jnc_CoderResult;
        var$2.$kind = 1;
        var$2.$length0 = 0;
        jnc_CoderResult_OVERFLOW = var$2;
        var$2 = new jn_ByteOrder;
        var$2.$name1 = $rt_s(6);
        jn_ByteOrder_BIG_ENDIAN = var$2;
        var$2 = new jn_ByteOrder;
        var$2.$name1 = $rt_s(7);
        jn_ByteOrder_LITTLE_ENDIAN = var$2;
        jur_AbstractSet_counter = 1;
        jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
        jur_AbstractCharClass_charClasses = new jur_AbstractCharClass$PredefinedCharacterClasses;
        $ptr = 1;
    case 1:
        nles_SYS_$callClinit();
        if ($rt_suspending()) {
            break main;
        }
        nles_VFSTestClass_test(nles_SYS_VFS);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($args, var$2, var$3, var$4, var$5, $ptr);
}
var jlr_AnnotatedElement = $rt_classWithoutFields(0);
var jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
function jl_Class_getClass($cls) {
    var $result, var$3;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null) {
        $result = new jl_Class;
        $result.$platformClass = $cls;
        var$3 = $result;
        $cls.classObject = var$3;
    }
    return $result;
}
function jl_Class_getComponentType($this) {
    var var$1, var$2, var$3;
    var$1 = $this.$platformClass.$meta.item;
    if (var$1 === null)
        var$2 = null;
    else {
        var$2 = var$1.classObject;
        if (var$2 === null) {
            var$2 = new jl_Class;
            var$2.$platformClass = var$1;
            var$3 = var$2;
            var$1.classObject = var$3;
        }
    }
    return var$2;
}
var otji_JS = $rt_classWithoutFields();
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
var otp_Platform = $rt_classWithoutFields();
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_isAssignable($from, $to) {
    var $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
}
function otp_Platform_stringFromCharCode($charCode) {
    return String.fromCharCode($charCode);
}
var ji_Serializable = $rt_classWithoutFields(0);
var jl_Comparable = $rt_classWithoutFields(0);
var jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
}
function jl_String__init_1(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_0($this, $characters) {
    var var$2, var$3, var$4, $i;
    $characters = $characters.data;
    var$2 = $characters.length;
    var$3 = $rt_createCharArray(var$2);
    var$4 = var$3.data;
    $this.$characters = var$3;
    $i = 0;
    while ($i < var$2) {
        var$4[$i] = $characters[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_2($this, $value, $offset, $count) {
    var var$4, var$5, $i;
    var$4 = $rt_createCharArray($count);
    var$5 = var$4.data;
    $this.$characters = var$4;
    $i = 0;
    while ($i < $count) {
        var$5[$i] = $value.data[$i + $offset | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    var var$2, var$3;
    if ($index >= 0) {
        var$2 = $this.$characters.data;
        if ($index < var$2.length)
            return var$2[$index];
    }
    var$3 = new jl_StringIndexOutOfBoundsException;
    var$3.$suppressionEnabled = 1;
    var$3.$writableStackTrace = 1;
    $rt_throw(var$3);
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_startsWith($this, $prefix, $toffset) {
    var var$3, var$4, var$5, var$6, var$7, $i, var$9;
    var$3 = $prefix.$characters.data;
    var$4 = var$3.length;
    var$5 = $toffset + var$4 | 0;
    var$6 = $this.$characters.data;
    var$7 = var$6.length;
    if (var$5 > var$7)
        return 0;
    $i = 0;
    a: {
        b: {
            while (true) {
                var$5 = $rt_compare($i, var$4);
                if (var$5 >= 0)
                    break;
                if ($i < 0)
                    break a;
                if (var$5 >= 0)
                    break a;
                var$9 = var$3[$i];
                var$5 = $toffset + 1 | 0;
                if ($toffset < 0)
                    break b;
                if ($toffset >= var$7)
                    break b;
                if (var$9 != var$6[$toffset])
                    return 0;
                $i = $i + 1 | 0;
                $toffset = var$5;
            }
            return 1;
        }
        $prefix = new jl_StringIndexOutOfBoundsException;
        $prefix.$suppressionEnabled = 1;
        $prefix.$writableStackTrace = 1;
        $rt_throw($prefix);
    }
    $prefix = new jl_StringIndexOutOfBoundsException;
    $prefix.$suppressionEnabled = 1;
    $prefix.$writableStackTrace = 1;
    $rt_throw($prefix);
}
function jl_String_startsWith0($this, $prefix) {
    if ($this === $prefix)
        return 1;
    return jl_String_startsWith($this, $prefix, 0);
}
function jl_String_endsWith($this, $suffix) {
    var var$2, var$3, var$4, var$5, $j, $i, var$8, var$9;
    if ($this === $suffix)
        return 1;
    var$2 = $suffix.$characters.data;
    var$3 = var$2.length;
    var$4 = $this.$characters.data;
    var$5 = var$4.length;
    if (var$3 > var$5)
        return 0;
    $j = 0;
    $i = var$5 - var$3 | 0;
    a: {
        b: {
            while (true) {
                var$8 = $rt_compare($i, var$5);
                if (var$8 >= 0)
                    break;
                if ($i < 0)
                    break a;
                if (var$8 >= 0)
                    break a;
                var$9 = var$4[$i];
                var$8 = $j + 1 | 0;
                if ($j < 0)
                    break b;
                if ($j >= var$3)
                    break b;
                if (var$9 != var$2[$j])
                    return 0;
                $i = $i + 1 | 0;
                $j = var$8;
            }
            return 1;
        }
        $suffix = new jl_StringIndexOutOfBoundsException;
        $suffix.$suppressionEnabled = 1;
        $suffix.$writableStackTrace = 1;
        $rt_throw($suffix);
    }
    $suffix = new jl_StringIndexOutOfBoundsException;
    $suffix.$suppressionEnabled = 1;
    $suffix.$writableStackTrace = 1;
    $rt_throw($suffix);
}
function jl_String_indexOf($this, $ch, $i) {
    var $bmpChar, var$4, $hi, $lo;
    if (0 > $i)
        $i = 0;
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            var$4 = $this.$characters.data;
            if ($i >= var$4.length)
                return (-1);
            if (var$4[$i] == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = (55296 | ($ch - 65536 | 0) >> 10 & 1023) & 65535;
    $lo = (56320 | $ch & 1023) & 65535;
    while (true) {
        var$4 = $this.$characters.data;
        if ($i >= (var$4.length - 1 | 0))
            return (-1);
        if (var$4[$i] == $hi && var$4[$i + 1 | 0] == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_lastIndexOf($this, $ch, $fromIndex) {
    var var$3, $i, $bmpChar, $hi, $lo;
    var$3 = $this.$characters.data;
    $i = var$3.length - 1 | 0;
    if ($fromIndex < $i)
        $i = $fromIndex;
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if (var$3[$i] == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = (55296 | ($ch - 65536 | 0) >> 10 & 1023) & 65535;
    $lo = (56320 | $ch & 1023) & 65535;
    while (true) {
        if ($i < 1)
            return (-1);
        if (var$3[$i] == $lo) {
            $ch = $i - 1 | 0;
            if (var$3[$ch] == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return $ch;
}
function jl_String_indexOf0($this, $str, $i) {
    var var$3, var$4, var$5, var$6, $toIndex, $j, var$9, var$10, var$11;
    if (0 > $i)
        $i = 0;
    var$3 = $this.$characters.data;
    var$4 = var$3.length;
    var$5 = $str.$characters.data;
    var$6 = var$5.length;
    $toIndex = var$4 - var$6 | 0;
    a: {
        b: {
            c: while (true) {
                if ($i > $toIndex)
                    return (-1);
                $j = 0;
                while (true) {
                    var$9 = $rt_compare($j, var$6);
                    if (var$9 >= 0)
                        break c;
                    var$10 = $i + $j | 0;
                    if (var$10 < 0)
                        break a;
                    if (var$10 >= var$4)
                        break a;
                    var$11 = var$3[var$10];
                    if ($j < 0)
                        break b;
                    if (var$9 >= 0)
                        break b;
                    if (var$11 != var$5[$j])
                        break;
                    $j = $j + 1 | 0;
                }
                $i = $i + 1 | 0;
            }
            return $i;
        }
        $str = new jl_StringIndexOutOfBoundsException;
        $str.$suppressionEnabled = 1;
        $str.$writableStackTrace = 1;
        $rt_throw($str);
    }
    $str = new jl_StringIndexOutOfBoundsException;
    $str.$suppressionEnabled = 1;
    $str.$writableStackTrace = 1;
    $rt_throw($str);
}
function jl_String_lastIndexOf0($this, $str, $fromIndex) {
    var var$3, var$4, var$5, var$6, $i, $j, var$9, var$10;
    var$3 = $this.$characters.data;
    var$4 = var$3.length;
    var$5 = $str.$characters.data;
    var$6 = var$5.length;
    $i = var$4 - var$6 | 0;
    if ($fromIndex < $i)
        $i = $fromIndex;
    a: {
        b: {
            c: while (true) {
                if ($i < 0)
                    return (-1);
                $j = 0;
                while (true) {
                    var$9 = $rt_compare($j, var$6);
                    if (var$9 >= 0)
                        break c;
                    var$10 = $i + $j | 0;
                    if (var$10 < 0)
                        break a;
                    if (var$10 >= var$4)
                        break a;
                    var$10 = var$3[var$10];
                    if ($j < 0)
                        break b;
                    if (var$9 >= 0)
                        break b;
                    if (var$10 != var$5[$j])
                        break;
                    $j = $j + 1 | 0;
                }
                $i = $i + (-1) | 0;
            }
            return $i;
        }
        $str = new jl_StringIndexOutOfBoundsException;
        $str.$suppressionEnabled = 1;
        $str.$writableStackTrace = 1;
        $rt_throw($str);
    }
    $str = new jl_StringIndexOutOfBoundsException;
    $str.$suppressionEnabled = 1;
    $str.$writableStackTrace = 1;
    $rt_throw($str);
}
function jl_String_substring($this, $beginIndex, $endIndex) {
    var var$3, var$4, var$5, var$6, var$7;
    if ($beginIndex > $endIndex) {
        var$3 = new jl_IndexOutOfBoundsException;
        var$3.$suppressionEnabled = 1;
        var$3.$writableStackTrace = 1;
        $rt_throw(var$3);
    }
    var$3 = new jl_String;
    var$4 = $this.$characters;
    $endIndex = $endIndex - $beginIndex | 0;
    var$5 = $rt_createCharArray($endIndex);
    var$6 = var$5.data;
    var$3.$characters = var$5;
    var$7 = 0;
    while (var$7 < $endIndex) {
        var$6[var$7] = var$4.data[var$7 + $beginIndex | 0];
        var$7 = var$7 + 1 | 0;
    }
    return var$3;
}
function jl_String_replace($this, $target, $replacement) {
    var $sb, $sz, $i, var$6, $j, var$8, var$9, var$10, var$11, var$12;
    $sb = new jl_StringBuilder;
    $sb.$buffer = $rt_createCharArray(16);
    $sz = $this.$characters.data.length - $target.$characters.data.length | 0;
    $i = 0;
    a: {
        b: {
            c: while (true) {
                if ($i > $sz) {
                    var$6 = $this.$characters.data;
                    $j = var$6.length;
                    if ($i > $j) {
                        $target = new jl_IndexOutOfBoundsException;
                        $target.$suppressionEnabled = 1;
                        $target.$writableStackTrace = 1;
                        $rt_throw($target);
                    }
                    $target = new jl_String;
                    $sz = $j - $i | 0;
                    var$8 = $rt_createCharArray($sz);
                    var$9 = var$8.data;
                    $target.$characters = var$8;
                    var$10 = 0;
                    while (var$10 < $sz) {
                        var$9[var$10] = var$6[var$10 + $i | 0];
                        var$10 = var$10 + 1 | 0;
                    }
                    jl_AbstractStringBuilder_insert($sb, $sb.$length, $target);
                    $target = new jl_String;
                    var$9 = $sb.$buffer;
                    $i = $sb.$length;
                    var$6 = $rt_createCharArray($i);
                    var$8 = var$6.data;
                    $target.$characters = var$6;
                    $sz = 0;
                    while ($sz < $i) {
                        var$8[$sz] = var$9.data[$sz + 0 | 0];
                        $sz = $sz + 1 | 0;
                    }
                    return $target;
                }
                $j = 0;
                d: {
                    while (true) {
                        var$9 = $target.$characters.data;
                        var$10 = $rt_compare($j, var$9.length);
                        if (var$10 >= 0)
                            break;
                        var$11 = $i + $j | 0;
                        if (var$11 < 0)
                            break b;
                        var$6 = $this.$characters.data;
                        var$12 = var$6.length;
                        if (var$11 >= var$12)
                            break b;
                        var$11 = var$6[var$11];
                        if ($j < 0)
                            break c;
                        if (var$10 >= 0)
                            break c;
                        if (var$11 != var$9[$j]) {
                            if ($i < 0)
                                break a;
                            if ($i >= var$12)
                                break a;
                            var$11 = var$6[$i];
                            var$10 = $sb.$length;
                            jl_AbstractStringBuilder_insertSpace($sb, var$10, var$10 + 1 | 0);
                            $sb.$buffer.data[var$10] = var$11;
                            break d;
                        }
                        $j = $j + 1 | 0;
                    }
                    jl_AbstractStringBuilder_insert($sb, $sb.$length, $replacement === null ? $rt_s(8) : $replacement);
                    $i = $i + ($target.$characters.data.length - 1 | 0) | 0;
                }
                $i = $i + 1 | 0;
            }
            $target = new jl_StringIndexOutOfBoundsException;
            $target.$suppressionEnabled = 1;
            $target.$writableStackTrace = 1;
            $rt_throw($target);
        }
        $target = new jl_StringIndexOutOfBoundsException;
        $target.$suppressionEnabled = 1;
        $target.$writableStackTrace = 1;
        $rt_throw($target);
    }
    $target = new jl_StringIndexOutOfBoundsException;
    $target.$suppressionEnabled = 1;
    $target.$writableStackTrace = 1;
    $rt_throw($target);
}
function jl_String_trim($this) {
    var $lower, var$2, var$3, $upper, var$5, var$6, var$7, var$8;
    $lower = 0;
    var$2 = $this.$characters.data;
    var$3 = var$2.length;
    $upper = var$3 - 1 | 0;
    a: {
        while (true) {
            if ($lower > $upper)
                break a;
            if ($lower < 0)
                break;
            if ($lower >= var$3)
                break;
            if (var$2[$lower] > 32)
                break a;
            $lower = $lower + 1 | 0;
        }
        var$5 = new jl_StringIndexOutOfBoundsException;
        var$5.$suppressionEnabled = 1;
        var$5.$writableStackTrace = 1;
        $rt_throw(var$5);
    }
    b: {
        while (true) {
            if ($lower > $upper)
                break b;
            if ($upper < 0)
                break;
            if ($upper >= var$3)
                break;
            if (var$2[$upper] > 32)
                break b;
            $upper = $upper + (-1) | 0;
        }
        var$5 = new jl_StringIndexOutOfBoundsException;
        var$5.$suppressionEnabled = 1;
        var$5.$writableStackTrace = 1;
        $rt_throw(var$5);
    }
    var$6 = $upper + 1 | 0;
    if ($lower > var$6) {
        var$5 = new jl_IndexOutOfBoundsException;
        var$5.$suppressionEnabled = 1;
        var$5.$writableStackTrace = 1;
        $rt_throw(var$5);
    }
    var$5 = new jl_String;
    var$6 = var$6 - $lower | 0;
    var$7 = $rt_createCharArray(var$6);
    var$8 = var$7.data;
    var$5.$characters = var$7;
    $upper = 0;
    while ($upper < var$6) {
        var$8[$upper] = var$2[$upper + $lower | 0];
        $upper = $upper + 1 | 0;
    }
    return var$5;
}
function jl_String_toString($this) {
    return $this;
}
function jl_String_equals($this, $other) {
    var var$2, var$3, var$4, var$5, $i, var$7, var$8;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    var$2 = $other.$characters.data;
    var$3 = var$2.length;
    var$4 = $this.$characters.data;
    var$5 = var$4.length;
    if (var$3 != var$5)
        return 0;
    $i = 0;
    a: {
        b: {
            while (true) {
                var$7 = $rt_compare($i, var$3);
                if (var$7 >= 0)
                    break;
                if ($i < 0)
                    break a;
                if ($i >= var$5)
                    break a;
                var$8 = var$4[$i];
                if ($i < 0)
                    break b;
                if (var$7 >= 0)
                    break b;
                if (var$8 != var$2[$i])
                    return 0;
                $i = $i + 1 | 0;
            }
            return 1;
        }
        $other = new jl_StringIndexOutOfBoundsException;
        $other.$suppressionEnabled = 1;
        $other.$writableStackTrace = 1;
        $rt_throw($other);
    }
    $other = new jl_StringIndexOutOfBoundsException;
    $other.$suppressionEnabled = 1;
    $other.$writableStackTrace = 1;
    $rt_throw($other);
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_84_0;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
var jl_Error = $rt_classWithoutFields(jl_Throwable);
var jl_LinkageError = $rt_classWithoutFields(jl_Error);
var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length = 0;
}
function jl_AbstractStringBuilder__init_() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_1(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this) {
    $this.$buffer = $rt_createCharArray(16);
}
function jl_AbstractStringBuilder__init_2($this, $capacity) {
    $this.$buffer = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $string) {
    jl_AbstractStringBuilder_insert($this, $this.$length, $string);
    return $this;
}
function jl_AbstractStringBuilder_insert($this, $index, $string) {
    var $i, $i_0, var$5, var$6, var$7, var$8;
    if ($index >= 0) {
        $i = $this.$length;
        if ($index <= $i) {
            if ($string === null)
                $string = $rt_s(8);
            else if ($string.$characters.data.length ? 0 : 1)
                return $this;
            jl_AbstractStringBuilder_ensureCapacity($this, $i + $string.$characters.data.length | 0);
            $i = $this.$length;
            $i_0 = $i - 1 | 0;
            while ($i_0 >= $index) {
                var$5 = $this.$buffer.data;
                var$5[$i_0 + $string.$characters.data.length | 0] = var$5[$i_0];
                $i_0 = $i_0 + (-1) | 0;
            }
            var$5 = $string.$characters.data;
            var$6 = var$5.length;
            $this.$length = $i + var$6 | 0;
            $i = 0;
            a: {
                while (true) {
                    $i_0 = $rt_compare($i, var$6);
                    if ($i_0 >= 0)
                        break;
                    var$7 = $this.$buffer;
                    var$8 = $index + 1 | 0;
                    if ($i < 0)
                        break a;
                    if ($i_0 >= 0)
                        break a;
                    var$7.data[$index] = var$5[$i];
                    $i = $i + 1 | 0;
                    $index = var$8;
                }
                return $this;
            }
            $string = new jl_StringIndexOutOfBoundsException;
            $string.$suppressionEnabled = 1;
            $string.$writableStackTrace = 1;
            $rt_throw($string);
        }
    }
    $string = new jl_StringIndexOutOfBoundsException;
    $string.$suppressionEnabled = 1;
    $string.$writableStackTrace = 1;
    $rt_throw($string);
}
function jl_AbstractStringBuilder_append0($this, $value, $radix) {
    return jl_AbstractStringBuilder_insert0($this, $this.$length, $value, $radix);
}
function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($value < $radix) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = 2147483647 / $radix | 0;
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if (var$10 > $value) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (var$10 > $posLimit)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (var$10 <= 0)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($value / var$10 | 0, $radix);
                $value = $value % var$10 | 0;
                var$10 = var$10 / $radix | 0;
                $positive = $target;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var var$2, var$3, $newLength, var$5, var$6, var$7;
    var$2 = $this.$buffer.data;
    var$3 = var$2.length;
    if (var$3 >= $capacity)
        return;
    if (var$3 >= 1073741823)
        $newLength = 2147483647;
    else {
        var$5 = var$3 * 2 | 0;
        $newLength = 5;
        if (var$5 > $newLength)
            $newLength = var$5;
        if ($capacity > $newLength)
            $newLength = $capacity;
    }
    var$6 = $rt_createCharArray($newLength);
    if ($newLength < var$3)
        var$3 = $newLength;
    var$7 = var$6.data;
    $capacity = 0;
    while ($capacity < var$3) {
        var$7[$capacity] = var$2[$capacity];
        $capacity = $capacity + 1 | 0;
    }
    $this.$buffer = var$6;
}
function jl_AbstractStringBuilder_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = $this.$length;
    var$4 = $rt_createCharArray(var$3);
    var$5 = var$4.data;
    var$1.$characters = var$4;
    var$6 = 0;
    while (var$6 < var$3) {
        var$5[var$6] = var$2.data[var$6 + 0 | 0];
        var$6 = var$6 + 1 | 0;
    }
    return var$1;
}
function jl_AbstractStringBuilder_insert1($this, $index, $chars, $offset, $len) {
    var var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        $len = $index + 1 | 0;
        var$8 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = $len;
        $offset = var$8;
    }
    return $this;
}
function jl_AbstractStringBuilder_deleteCharAt($this, $i) {
    var var$2, var$3, $i_0, var$5;
    if ($i >= 0) {
        var$2 = $this.$length;
        if ($i < var$2) {
            var$2 = var$2 - 1 | 0;
            $this.$length = var$2;
            while ($i < var$2) {
                var$3 = $this.$buffer.data;
                $i_0 = $i + 1 | 0;
                var$3[$i] = var$3[$i_0];
                $i = $i_0;
            }
            return $this;
        }
    }
    var$5 = new jl_StringIndexOutOfBoundsException;
    var$5.$suppressionEnabled = 1;
    var$5.$writableStackTrace = 1;
    $rt_throw(var$5);
}
function jl_AbstractStringBuilder_delete($this, $start, $end) {
    var $sz, var$4, $i, var$6, var$7, var$8;
    $sz = $rt_compare($start, $end);
    if ($sz <= 0) {
        var$4 = $this.$length;
        if ($start <= var$4) {
            if (!$sz)
                return $this;
            $sz = var$4 - $end | 0;
            $this.$length = var$4 - ($end - $start | 0) | 0;
            $i = 0;
            while ($i < $sz) {
                var$6 = $this.$buffer.data;
                var$7 = $start + 1 | 0;
                var$4 = $end + 1 | 0;
                var$6[$start] = var$6[$end];
                $i = $i + 1 | 0;
                $start = var$7;
                $end = var$4;
            }
            return $this;
        }
    }
    var$8 = new jl_StringIndexOutOfBoundsException;
    var$8.$suppressionEnabled = 1;
    var$8.$writableStackTrace = 1;
    $rt_throw(var$8);
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var var$3, $sz, $i, var$6;
    var$3 = $this.$length;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length = $this.$length + ($end - $start | 0) | 0;
}
var jl_Appendable = $rt_classWithoutFields(0);
var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
function jl_StringBuilder_append($this, $c) {
    var var$2;
    var$2 = $this.$length;
    jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 1 | 0);
    $this.$buffer.data[var$2] = $c;
    return $this;
}
function jl_StringBuilder_delete($this, $start, $end) {
    jl_AbstractStringBuilder_delete($this, $start, $end);
    return $this;
}
function jl_StringBuilder_insert($this, var$1, var$2, var$3, var$4) {
    var var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, var$1, var$1 + var$4 | 0);
    var$5 = var$4 + var$3 | 0;
    while (var$3 < var$5) {
        var$6 = var$2.data;
        var$7 = $this.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$8 = var$3 + 1 | 0;
        var$7[var$1] = var$6[var$3];
        var$1 = var$4;
        var$3 = var$8;
    }
    return $this;
}
function jl_StringBuilder_append0($this, var$1, var$2, var$3) {
    var var$4, var$5, var$6, var$7, var$8;
    var$4 = $this.$length;
    jl_AbstractStringBuilder_insertSpace($this, var$4, var$4 + var$3 | 0);
    var$5 = var$3 + var$2 | 0;
    while (var$2 < var$5) {
        var$6 = var$1.data;
        var$7 = $this.$buffer.data;
        var$3 = var$4 + 1 | 0;
        var$8 = var$2 + 1 | 0;
        var$7[var$4] = var$6[var$2];
        var$4 = var$3;
        var$2 = var$8;
    }
    return $this;
}
function jl_StringBuilder_length($this) {
    return $this.$length;
}
function jl_StringBuilder_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = $this.$length;
    var$4 = $rt_createCharArray(var$3);
    var$5 = var$4.data;
    var$1.$characters = var$4;
    var$6 = 0;
    while (var$6 < var$3) {
        var$5[var$6] = var$2.data[var$6 + 0 | 0];
        var$6 = var$6 + 1 | 0;
    }
    return var$1;
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert0($this, var$1, var$2) {
    jl_AbstractStringBuilder_insertSpace($this, var$1, var$1 + 1 | 0);
    $this.$buffer.data[var$1] = var$2;
    return $this;
}
var jl_Number = $rt_classWithoutFields();
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
function jl_Integer_toString($i, $radix) {
    var var$3;
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    return (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, $i, $radix)).$toString();
}
function jl_Integer_toString0($i) {
    var var$2;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    return (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, $i, 10)).$toString();
}
function jl_Integer_parseInt($s, $radix) {
    var var$3, var$4, $negative, $index, $value, $digit, var$9, var$10, var$11, var$12;
    if ($radix >= 2 && $radix <= 36) {
        if ($s !== null) {
            var$3 = $s.$characters.data;
            var$4 = var$3.length;
            if (!(var$4 ? 0 : 1)) {
                $negative = 0;
                $index = 0;
                if (0 >= var$4) {
                    $s = new jl_StringIndexOutOfBoundsException;
                    $s.$suppressionEnabled = 1;
                    $s.$writableStackTrace = 1;
                    $rt_throw($s);
                }
                a: {
                    switch (var$3[0]) {
                        case 43:
                            $index = 1;
                            break a;
                        case 45:
                            $negative = 1;
                            $index = 1;
                            break a;
                        default:
                    }
                }
                $value = 0;
                if ($index == var$4) {
                    $s = new jl_NumberFormatException;
                    $s.$suppressionEnabled = 1;
                    $s.$writableStackTrace = 1;
                    $rt_throw($s);
                }
                b: {
                    while (true) {
                        var$3 = $s.$characters.data;
                        $digit = $rt_compare($index, var$3.length);
                        if ($digit >= 0)
                            break;
                        var$4 = $index + 1 | 0;
                        if ($index < 0)
                            break b;
                        if ($digit >= 0)
                            break b;
                        $digit = jl_Character_getNumericValue(var$3[$index]);
                        if ($digit < 0) {
                            var$9 = new jl_NumberFormatException;
                            var$10 = new jl_StringBuilder;
                            var$10.$buffer = $rt_createCharArray(16);
                            jl_AbstractStringBuilder_insert(var$10, var$10.$length, $rt_s(9));
                            jl_AbstractStringBuilder_insert(var$10, var$10.$length, $s);
                            $s = new jl_String;
                            var$3 = var$10.$buffer;
                            $negative = var$10.$length;
                            var$11 = $rt_createCharArray($negative);
                            var$12 = var$11.data;
                            $s.$characters = var$11;
                            $index = 0;
                            while ($index < $negative) {
                                var$12[$index] = var$3.data[$index + 0 | 0];
                                $index = $index + 1 | 0;
                            }
                            var$9.$suppressionEnabled = 1;
                            var$9.$writableStackTrace = 1;
                            var$9.$message = $s;
                            $rt_throw(var$9);
                        }
                        if ($digit >= $radix) {
                            var$9 = new jl_NumberFormatException;
                            var$10 = new jl_StringBuilder;
                            var$10.$buffer = $rt_createCharArray(16);
                            jl_AbstractStringBuilder_insert(var$10, var$10.$length, $rt_s(10));
                            jl_AbstractStringBuilder_insert0(var$10, var$10.$length, $radix, 10);
                            jl_AbstractStringBuilder_insert(var$10, var$10.$length, $rt_s(11));
                            jl_AbstractStringBuilder_insert(var$10, var$10.$length, $s);
                            $s = jl_StringBuilder_toString(var$10);
                            var$9.$suppressionEnabled = 1;
                            var$9.$writableStackTrace = 1;
                            var$9.$message = $s;
                            $rt_throw(var$9);
                        }
                        $value = $rt_imul($radix, $value) + $digit | 0;
                        if ($value < 0) {
                            if (var$4 == $s.$characters.data.length && $value == (-2147483648) && $negative)
                                return (-2147483648);
                            var$9 = new jl_NumberFormatException;
                            var$10 = new jl_StringBuilder;
                            jl_AbstractStringBuilder__init_2(var$10, 16);
                            jl_AbstractStringBuilder_append(var$10, $rt_s(12));
                            jl_AbstractStringBuilder_append(var$10, $s);
                            jl_NumberFormatException__init_(var$9, jl_StringBuilder_toString(var$10));
                            $rt_throw(var$9);
                        }
                        $index = var$4;
                    }
                    if ($negative)
                        $value =  -$value | 0;
                    return $value;
                }
                $s = new jl_StringIndexOutOfBoundsException;
                $s.$suppressionEnabled = 1;
                $s.$writableStackTrace = 1;
                $rt_throw($s);
            }
        }
        $s = new jl_NumberFormatException;
        $s.$suppressionEnabled = 1;
        $s.$writableStackTrace = 1;
        $s.$message = $rt_s(13);
        $rt_throw($s);
    }
    var$9 = new jl_NumberFormatException;
    $s = new jl_StringBuilder;
    $s.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert($s, $s.$length, $rt_s(14));
    jl_AbstractStringBuilder_insert0($s, $s.$length, $radix, 10);
    var$10 = new jl_String;
    var$3 = $s.$buffer;
    $negative = $s.$length;
    var$11 = $rt_createCharArray($negative);
    var$12 = var$11.data;
    var$10.$characters = var$11;
    $index = 0;
    while ($index < $negative) {
        var$12[$index] = var$3.data[$index + 0 | 0];
        $index = $index + 1 | 0;
    }
    var$9.$suppressionEnabled = 1;
    var$9.$writableStackTrace = 1;
    var$9.$message = var$10;
    $rt_throw(var$9);
}
function jl_Integer_numberOfLeadingZeros($i) {
    var $n, var$3;
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 >>> 8;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i >>> 4;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 >>> 2;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer_numberOfTrailingZeros($i) {
    var $n, var$3;
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 << 8;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i << 4;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 << 2;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
var jl_Exception = $rt_classWithoutFields(jl_Throwable);
var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
var nles_SYS = $rt_classWithoutFields();
var nles_SYS_PERSIST = 0;
var nles_SYS_VFS = null;
var nles_SYS_$clinitCalled = false;
function nles_SYS_$callClinit() {
    var $ptr = 0;
    if ($rt_resuming()) {
        $ptr = $rt_nativeThread().pop();
    } else if (nles_SYS_$clinitCalled) {
        return;
    }
    main: while (true) { switch ($ptr) {
    case 0:
        nles_SYS_$clinitCalled = true;
        $ptr = 1;
    case 1:
        nles_SYS__clinit_();
        if ($rt_suspending()) {
            break main;
        }
        nles_SYS_$callClinit = $rt_eraseClinit(nles_SYS);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($ptr);
}
function nles_SYS_requestPersist() {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            nles_SYS_requestPersist0(callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function nles_SYS_requestPersist0($callback) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$callback = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        nles_SYS_$callClinit();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = new nles_SYS$requestPersist$lambda$_2_0;
        var$2.$_0 = $callback;
        $callback = otji_JS_function(var$2, "complete");
        $ptr = 2;
    case 2:
        nles_SYS_requestPersist0$js_body$_3($callback);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($callback, var$2, $ptr);
}
function nles_SYS__clinit_() {
    var $vh, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$vh = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = nles_SYS_requestPersist();
        if ($rt_suspending()) {
            break main;
        }
        $vh = $tmp;
        var$2 = $vh.$bool;
        nles_SYS_PERSIST = var$2;
        if (!var$2)
            alert("PERSISTENT STORAGE NOT AVAILABLE, YOUR BROWSER MAY DELETE YOUR WORLDS!");
        $vh = $rt_s(15);
        $ptr = 2;
    case 2:
        $tmp = nles_VirtualFilesystem_openVFS($vh);
        if ($rt_suspending()) {
            break main;
        }
        $vh = $tmp;
        if ($vh.$vfs === null) {
            var$3 = new jl_StringBuilder;
            var$3.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(16));
            var$4 = nles_VirtualFilesystem$VFSHandle_toString($vh);
            jl_AbstractStringBuilder_insert(var$3, var$3.$length, var$4);
            var$4 = new jl_String;
            var$5 = var$3.$buffer;
            var$6 = var$3.$length;
            var$7 = $rt_createCharArray(var$6);
            var$8 = var$7.data;
            var$4.$characters = var$7;
            var$9 = 0;
            while (var$9 < var$6) {
                var$8[var$9] = var$5.data[var$9 + 0 | 0];
                var$9 = var$9 + 1 | 0;
            }
            alert($rt_ustr(var$4));
        }
        nles_SYS_VFS = $vh.$vfs;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($vh, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr);
}
function nles_SYS_requestPersist0$js_body$_3(var$1) {
    if (navigator.storage && navigator.storage.persist) {
        (navigator.storage.persist()).then(function(persistent) {
            var$1(persistent ? { p : true } : null);
        });
    } else {
        var$1(null);
    }
}
var nles_VFSTestClass = $rt_classWithoutFields();
function nles_VFSTestClass_test($vfs) {
    var $f, var$3, var$4, var$5, var$6;
    $f = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(17);
    $f.$path = nles_VFile_createPath(var$3);
    if (jl_System_outCache === null) {
        var$4 = new ji_PrintStream;
        var$4.$out = otcic_StdoutOutputStream_INSTANCE;
        $vfs = new jl_StringBuilder;
        $vfs.$buffer = $rt_createCharArray(16);
        var$4.$sb = $vfs;
        var$4.$buffer0 = $rt_createCharArray(32);
        var$4.$autoFlush = 0;
        var$4.$charset = jnci_UTF8Charset_INSTANCE;
        jl_System_outCache = var$4;
    }
    ji_PrintStream_println(jl_System_outCache, $f);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(18);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(19);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(20);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(21);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(22);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $rt_s(23);
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$rt_s(24), $rt_s(25), $rt_s(26)]));
    ji_PrintStream_println(jl_System_out(), $vfs);
    $f = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$vfs, $rt_s(27), $rt_s(24), $rt_s(25), $rt_s(26)]));
    ji_PrintStream_println(jl_System_out(), $f);
    $vfs = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$f, $rt_s(28), $rt_s(24), $rt_s(29), $rt_s(26)]));
    ji_PrintStream_println(jl_System_out(), $vfs);
    $f = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$rt_s(30), $vfs]));
    ji_PrintStream_println(jl_System_out(), $f);
    $vfs = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$rt_s(31), $f]));
    ji_PrintStream_println(jl_System_out(), $vfs);
    $f = nles_VFile__init_0($rt_createArrayFromData(jl_Object, [$rt_s(32), $vfs]));
    ji_PrintStream_println(jl_System_out(), $f);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 4);
    var$5 = var$3.data;
    var$5[0] = $rt_s(32);
    var$5[1] = $rt_s(33);
    var$5[2] = $f;
    $f = new nles_VFile;
    var$6 = $rt_createArray(jl_Object, 1);
    var$6.data[0] = $rt_s(34);
    nles_VFile__init_($f, var$6);
    var$5[3] = $f;
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $f = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 2);
    var$5 = var$3.data;
    var$5[0] = $vfs;
    $vfs = new nles_VFile;
    var$6 = $rt_createArray(jl_Object, 1);
    var$6.data[0] = $rt_s(35);
    nles_VFile__init_($vfs, var$6);
    var$5[1] = $vfs;
    nles_VFile__init_($f, var$3);
    ji_PrintStream_println(jl_System_out(), $f);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 2);
    var$5 = var$3.data;
    var$5[0] = $rt_s(36);
    $f = new nles_VFile;
    var$6 = $rt_createArray(jl_Object, 1);
    var$6.data[0] = $rt_s(35);
    nles_VFile__init_($f, var$6);
    var$5[1] = $f;
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 2);
    var$5 = var$3.data;
    var$5[0] = $rt_s(37);
    $f = new nles_VFile;
    var$6 = $rt_createArray(jl_Object, 1);
    var$6.data[0] = $rt_s(35);
    nles_VFile__init_($f, var$6);
    var$5[1] = $f;
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
    $vfs = new nles_VFile;
    var$3 = $rt_createArray(jl_Object, 2);
    var$5 = var$3.data;
    var$5[0] = $rt_s(38);
    $f = new nles_VFile;
    var$6 = $rt_createArray(jl_Object, 1);
    var$6.data[0] = $rt_s(35);
    nles_VFile__init_($f, var$6);
    var$5[1] = $f;
    nles_VFile__init_($vfs, var$3);
    ji_PrintStream_println(jl_System_out(), $vfs);
}
var otci_IntegerUtil = $rt_classWithoutFields();
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $sz, $chars, $pos, $target, $target_0, var$10, var$11, var$12;
    if (!$value)
        return $rt_s(39);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz).data;
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        $target_0 = $target + 1 | 0;
        $chars[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    var$10 = new jl_String;
    $value = $chars.length;
    var$11 = $rt_createCharArray($value);
    var$12 = var$11.data;
    var$10.$characters = var$11;
    $radixLog2 = 0;
    while ($radixLog2 < $value) {
        var$12[$radixLog2] = $chars[$radixLog2];
        $radixLog2 = $radixLog2 + 1 | 0;
    }
    return var$10;
}
function nles_VFile() {
    jl_Object.call(this);
    this.$path = null;
}
var nles_VFile_altPathSeperator = null;
function nles_VFile__init_0(var_0) {
    var var_1 = new nles_VFile();
    nles_VFile__init_(var_1, var_0);
    return var_1;
}
function nles_VFile_normalizePath($p) {
    var $i, var$3, var$4, var$5, var$6, var$7, var$8;
    $i = 0;
    while (true) {
        var$3 = nles_VFile_altPathSeperator.data;
        if ($i >= var$3.length)
            break;
        $p = jl_String_replace($p, var$3[$i], $rt_s(40));
        $i = $i + 1 | 0;
    }
    if ($p === $rt_s(40) ? 1 : jl_String_startsWith($p, $rt_s(40), 0)) {
        var$4 = $rt_s(40).$characters.data.length;
        var$5 = $p.$characters.data;
        $i = var$5.length;
        if (var$4 > $i) {
            $p = new jl_IndexOutOfBoundsException;
            $p.$suppressionEnabled = 1;
            $p.$writableStackTrace = 1;
            $rt_throw($p);
        }
        $p = new jl_String;
        $i = $i - var$4 | 0;
        var$3 = $rt_createCharArray($i);
        var$6 = var$3.data;
        $p.$characters = var$3;
        var$7 = 0;
        while (var$7 < $i) {
            var$6[var$7] = var$5[var$7 + var$4 | 0];
            var$7 = var$7 + 1 | 0;
        }
    }
    if (jl_String_endsWith($p, $rt_s(40))) {
        var$5 = $p.$characters.data;
        var$7 = var$5.length - $rt_s(40).$characters.data.length | 0;
        if (0 > var$7) {
            $p = new jl_IndexOutOfBoundsException;
            $p.$suppressionEnabled = 1;
            $p.$writableStackTrace = 1;
            $rt_throw($p);
        }
        $p = new jl_String;
        var$7 = var$7 - 0 | 0;
        var$3 = $rt_createCharArray(var$7);
        var$6 = var$3.data;
        $p.$characters = var$3;
        var$8 = 0;
        while (var$8 < var$7) {
            var$6[var$8] = var$5[var$8 + 0 | 0];
            var$8 = var$8 + 1 | 0;
        }
    }
    return $p;
}
function nles_VFile_createPath($p) {
    var $r, $i, var$4, $s, $j, var$7, var$8, $gg, var$10, $k;
    $r = new ju_ArrayList;
    $r.$array = $rt_createArray(jl_Object, 10);
    $i = 0;
    a: while (true) {
        var$4 = $p.data;
        if ($i >= var$4.length) {
            if ($r.$size <= 0)
                return null;
            $s = new jl_StringBuilder;
            $s.$buffer = $rt_createCharArray(16);
            $i = 0;
            while (true) {
                if ($i >= $r.$size) {
                    $r = new jl_String;
                    $p = $s.$buffer;
                    $j = $s.$length;
                    var$4 = $rt_createCharArray($j);
                    var$7 = var$4.data;
                    $r.$characters = var$4;
                    var$8 = 0;
                    while (var$8 < $j) {
                        var$7[var$8] = $p.data[var$8 + 0 | 0];
                        var$8 = var$8 + 1 | 0;
                    }
                    return $r;
                }
                if ($i > 0)
                    jl_AbstractStringBuilder_insert($s, $s.$length, $rt_s(40));
                if ($i < 0)
                    break;
                if ($i >= $r.$size)
                    break;
                $gg = $r.$array.data[$i];
                jl_AbstractStringBuilder_insert($s, $s.$length, $gg);
                $i = $i + 1 | 0;
            }
            $r = new jl_IndexOutOfBoundsException;
            $r.$suppressionEnabled = 1;
            $r.$writableStackTrace = 1;
            $rt_throw($r);
        }
        b: {
            if (var$4[$i] !== null) {
                $gg = var$4[$i].$toString();
                if ($gg !== null) {
                    $gg = nles_VFile_normalizePath($gg);
                    var$4 = jur_Pattern_split(jur_Pattern_compile($rt_s(40), 0), $gg, 0);
                    $j = 0;
                    while (true) {
                        var$7 = var$4.data;
                        var$8 = var$7.length;
                        if ($j >= var$8)
                            break;
                        var$7[$j] = jl_String_trim(var$7[$j]);
                        $j = $j + 1 | 0;
                    }
                    $j = 0;
                    while (true) {
                        if ($j >= var$8)
                            break b;
                        c: {
                            if (var$7[$j] !== null && !jl_String_equals(var$7[$j], $rt_s(29))) {
                                if (jl_String_equals(var$7[$j], $rt_s(41))) {
                                    var$10 = $r.$size;
                                    if (var$10 > 0) {
                                        $k = var$10 - 1 | 0;
                                        if ($k < 0)
                                            break a;
                                        if ($k >= var$10)
                                            break a;
                                        if (!jl_String_equals($r.$array.data[$k], $rt_s(41)))
                                            ju_ArrayList_remove($r, $k);
                                        else {
                                            ju_ArrayList_ensureCapacity($r, $r.$size + 1 | 0);
                                            var$4 = $r.$array.data;
                                            var$10 = $r.$size;
                                            $r.$size = var$10 + 1 | 0;
                                            var$4[var$10] = $rt_s(41);
                                            $r.$modCount = $r.$modCount + 1 | 0;
                                        }
                                        break c;
                                    }
                                }
                                $s = var$7[$j];
                                ju_ArrayList_ensureCapacity($r, $r.$size + 1 | 0);
                                var$4 = $r.$array.data;
                                var$10 = $r.$size;
                                $r.$size = var$10 + 1 | 0;
                                var$4[var$10] = $s;
                                $r.$modCount = $r.$modCount + 1 | 0;
                            }
                        }
                        $j = $j + 1 | 0;
                    }
                }
            }
        }
        $i = $i + 1 | 0;
    }
    $r = new jl_IndexOutOfBoundsException;
    $r.$suppressionEnabled = 1;
    $r.$writableStackTrace = 1;
    $rt_throw($r);
}
function nles_VFile__init_($this, $p) {
    $this.$path = nles_VFile_createPath($p);
}
function nles_VFile_toString($this) {
    return $this.$path;
}
function nles_VFile__clinit_() {
    var var$1;
    var$1 = $rt_createArray(jl_String, 1);
    var$1.data[0] = $rt_s(1);
    nles_VFile_altPathSeperator = var$1;
}
var jl_System = $rt_classWithoutFields();
var jl_System_outCache = null;
function jl_System_out() {
    var var$1, var$2;
    if (jl_System_outCache === null) {
        var$1 = new ji_PrintStream;
        var$1.$out = otcic_StdoutOutputStream_INSTANCE;
        var$2 = new jl_StringBuilder;
        var$2.$buffer = $rt_createCharArray(16);
        var$1.$sb = var$2;
        var$1.$buffer0 = $rt_createCharArray(32);
        var$1.$autoFlush = 0;
        var$1.$charset = jnci_UTF8Charset_INSTANCE;
        jl_System_outCache = var$1;
    }
    return jl_System_outCache;
}
function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
    var var$6, $elem, $targetType, $srcType, $srcArray, $i, var$12, var$13, var$14, var$15;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                b: {
                    if ($src !== $dest) {
                        var$6 = $src.constructor;
                        if (var$6 === null)
                            $elem = null;
                        else {
                            $elem = var$6.classObject;
                            if ($elem === null) {
                                $elem = new jl_Class;
                                $elem.$platformClass = var$6;
                                $targetType = $elem;
                                var$6.classObject = $targetType;
                            }
                        }
                        $srcType = jl_Class_getComponentType($elem);
                        var$6 = $dest.constructor;
                        if (var$6 === null)
                            $elem = null;
                        else {
                            $elem = var$6.classObject;
                            if ($elem === null) {
                                $elem = new jl_Class;
                                $elem.$platformClass = var$6;
                                $targetType = $elem;
                                var$6.classObject = $targetType;
                            }
                        }
                        $targetType = jl_Class_getComponentType($elem);
                        if ($srcType !== null && $targetType !== null) {
                            if ($srcType === $targetType)
                                break b;
                            if (!($srcType.$platformClass.$meta.primitive ? 1 : 0) && !($targetType.$platformClass.$meta.primitive ? 1 : 0)) {
                                $srcArray = $src;
                                $i = 0;
                                var$12 = $srcPos;
                                while ($i < $length) {
                                    var$13 = $srcArray.data;
                                    var$14 = var$12 + 1 | 0;
                                    var$6 = var$13[var$12];
                                    var$15 = $targetType.$platformClass;
                                    if (!(var$6 !== null && !(typeof var$6.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable(var$6.constructor, var$15) ? 1 : 0)) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        $src.$suppressionEnabled = 1;
                                        $src.$writableStackTrace = 1;
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$12 = var$14;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                            if (!($srcType.$platformClass.$meta.primitive ? 1 : 0))
                                break a;
                            if ($targetType.$platformClass.$meta.primitive ? 1 : 0)
                                break b;
                            else
                                break a;
                        }
                        $src = new jl_ArrayStoreException;
                        $src.$suppressionEnabled = 1;
                        $src.$writableStackTrace = 1;
                        $rt_throw($src);
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            $src.$suppressionEnabled = 1;
            $src.$writableStackTrace = 1;
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        $src.$suppressionEnabled = 1;
        $src.$writableStackTrace = 1;
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    $dest.$suppressionEnabled = 1;
    $dest.$writableStackTrace = 1;
    $dest.$message = $rt_s(42);
    $rt_throw($dest);
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
var ju_Comparator = $rt_classWithoutFields(0);
var jl_String$_clinit_$lambda$_84_0 = $rt_classWithoutFields();
var jl_Character = $rt_classWithoutFields();
var jl_Character_TYPE = null;
var jl_Character_digitMapping = null;
var jl_Character_classMapping = null;
var jl_Character_characterCache = null;
var jl_Character_$$metadata$$1 = null;
var jl_Character_$$metadata$$2 = null;
function jl_Character_toString($c) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1).data;
    var$3[0] = $c;
    $c = var$3.length;
    var$4 = $rt_createCharArray($c);
    var$5 = var$4.data;
    var$2.$characters = var$4;
    var$6 = 0;
    while (var$6 < $c) {
        var$5[var$6] = var$3[var$6];
        var$6 = var$6 + 1 | 0;
    }
    return var$2;
}
function jl_Character_toCodePoint($high, $low) {
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
}
function jl_Character_codePointAt($a, $index, $limit) {
    var var$4;
    if ($index < ($limit - 1 | 0)) {
        var$4 = $a.data;
        if ((var$4[$index] & 64512) != 55296 ? 0 : 1) {
            $limit = $index + 1 | 0;
            if ((var$4[$limit] & 64512) != 56320 ? 0 : 1)
                return ((var$4[$index] & 1023) << 10 | var$4[$limit] & 1023) + 65536 | 0;
        }
    }
    return $a.data[$index];
}
function jl_Character_toLowerCase($ch) {
    return (String.fromCharCode($ch)).toLowerCase().charCodeAt(0) & 65535;
}
function jl_Character_toUpperCase($ch) {
    return (String.fromCharCode($ch)).toUpperCase().charCodeAt(0) & 65535;
}
function jl_Character_getNumericValue($codePoint) {
    var $digitMapping, $l, $u, $idx, var$6, $val;
    if (jl_Character_digitMapping === null) {
        if (jl_Character_$$metadata$$1 === null)
            jl_Character_$$metadata$$1 = jl_Character_obtainDigitMapping$$create();
        jl_Character_digitMapping = otciu_UnicodeHelper_decodeIntPairsDiff((jl_Character_$$metadata$$1.value !== null ? $rt_str(jl_Character_$$metadata$$1.value) : null));
    }
    $digitMapping = jl_Character_digitMapping.data;
    $l = 0;
    $u = ($digitMapping.length / 2 | 0) - 1 | 0;
    while ($u >= $l) {
        $idx = ($l + $u | 0) / 2 | 0;
        var$6 = $idx * 2 | 0;
        $val = $rt_compare($codePoint, $digitMapping[var$6]);
        if ($val > 0)
            $l = $idx + 1 | 0;
        else {
            if ($val >= 0)
                return $digitMapping[var$6 + 1 | 0];
            $u = $idx - 1 | 0;
        }
    }
    return (-1);
}
function jl_Character_forDigit($digit, $radix) {
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character_getType($codePoint) {
    var $l, $u, $classes, $i, $range;
    if ($codePoint > 0 && $codePoint <= 65535 ? 1 : 0) {
        $l = $codePoint & 65535 & 64512;
        $u = $l != 55296 ? 0 : 1;
        if (!$u && !($l != 56320 ? 0 : 1) ? 0 : 1)
            return 19;
    }
    if (jl_Character_classMapping === null) {
        if (jl_Character_$$metadata$$2 === null)
            jl_Character_$$metadata$$2 = jl_Character_obtainClasses$$create();
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle((jl_Character_$$metadata$$2.value !== null ? $rt_str(jl_Character_$$metadata$$2.value) : null));
    }
    $classes = jl_Character_classMapping.data;
    $l = 0;
    $u = $classes.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = $classes[$i];
        if ($codePoint >= $range.$end)
            $l = $i + 1 | 0;
        else {
            $u = $range.$start;
            if ($codePoint >= $u)
                return $range.$data.data[$codePoint - $u | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
}
function jl_Character_isIdentifierIgnorable($codePoint) {
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Character_obtainDigitMapping$$create() {
    return {"value" : "{?*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%BhG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%slG%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%sTEG%%%%%%%%%%%%%%%%%%&5G%%%%%%%%%%%%%%%%%%28UG%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%VR#G%%%%%%%%%%%%%"
    + "%%%%%"};
}
function jl_Character_obtainClasses$$create() {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!Cg&C<E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!#"
    + "!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BGA#%Y\'CJ95A#^#; GN5\'9G#9G#9\'A)F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91 Y#FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,AVF6 F)A6G01GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I# F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'A#G#) F\'A%F#A#F7 F( F# F# F#A#\' "
    + "I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A)\')A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A$&G$I% G$ G%A(G# F$A&F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A(& F#G#A#J+ F#A.G#I# F) F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\'A#I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G\'A#J+A#F%AA&^$Y0=9^$G#^\'J+L+=\'=\'=\'6767"
    + "I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F. F%G$A,F3G$Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1 J+A\'FD%FVA(F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(AcG%)FP\')G&)\'I&\'I#F(A%J+Y(^+G*^*A$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y%FEI)G)I#G#A$Y&"
    + "J+A$F$J+F?E\'Y#C*A(BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFG[ G&!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67 E.A$[AA1G.H%\'H$G-A0^#"
    + "!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^gA:^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#^AA#b=I! BP CP !#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y&%Y+U#Y%"
    + "596Y.AQ^; b=:! A-b=7$ A;^-A%-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+F<A&^EA-F1^@ L+^?L)=L0^AL+^HL0b= & &b UG!&A+^b&b   %b O(!&A1F6%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#A#!#B$AQ&E##F(\'F$\'F%\'F8I#G#)^%A%L\'^#;=A\'FUY%A)I#F"
    + "SI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C)A)b#1! FDI#\'I#\'I#9)\'A#J+A\'&b CO#&A-F8A%FRA%4b `. T#b `! T#b `0 43b `D!3b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]1A2b&L& 76A1FbA#FWAIF-;=A#G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# =Z%^#A+Q$^#A#F- F; F4 F# F0"
    + "A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^-A%=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9b 1# b&X% A*F7A+F)b 9# F\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9AbFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+b G% L@b !# F>L+&A)F7G,L%Y&b \'# F8A*)\')FVG0Y(A%L5J+A0G$)FNI$G%I#G#Y#1Y%A,1A#F:A(J+A\'G$FEG&)G) J+Y%&I#A*FD\'Y#&A*G#)FQI$G*I#F%Y%G%9A#J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'AcF( & F% F0 F+"
    + "9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&b ,# FVI$G)I#G$)\'F%Y&J+ 9 9\'&AAFQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&A(J+AWF<A#G$I#G%)G&A%J+L#Y$=b  $ FMI$G*)G#9b E! BACAJ+L*A-&b A# F)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)&G\'I#G$FOG.)G#Y$&Y&A>FZb (% F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+b W% F4G#I#Y#b ($ L6^)[%^2A.9b&;/ b G! b+P!  Y&A,b&%$ b ^K b&P1  Q*b (a b&(* b Z\'#b&Z) A(F"
    + "@ J+A%Y#b A! F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q+ BACAL8Y%b F! FmA%\'&IXA(G%E.AbE#9%A=&b W@!&A)b&T, b .5#b&@% ARF$A2F%A)b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =.!b=W$ A+^HA#^^I#G$^$I\'Q)G)^#G(^?G%^]A8^dG$=b ;# L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C=A#B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 16 G( G2A#G( G# G&b 6$ FNA$G(E(A#J+A%&=b Q& FMG%J+A&;b  5 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN="
    + "L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.A$b=>! A$^_AZ^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=7, A+^.A$^,A&b=U! A-b=:! A(^-A5^-A%^YA)^+A\'^IA)^?b 3! ^- b=F!  ^%A$^JA#^\'A$^>A#b=(# A-^/A#^%A%^$A&^$A.^\'b K6 &b   %b   %b 6<#&AJ&b T !&A,&b =$ &A#&b  ;!&A/&b PU!&b @Q b&?) b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b D8 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$3b   %b   %b   %b ^a$3A#3b   %b   %b   %b ^a$3"};
}
function nles_BooleanResult() {
    jl_Object.call(this);
    this.$bool = 0;
}
var nles_BooleanResult_TRUE = null;
var nles_BooleanResult_FALSE = null;
function nles_BooleanResult__clinit_() {
    var var$1;
    var$1 = new nles_BooleanResult;
    var$1.$bool = 1;
    nles_BooleanResult_TRUE = var$1;
    var$1 = new nles_BooleanResult;
    var$1.$bool = 0;
    nles_BooleanResult_FALSE = var$1;
}
function nles_VirtualFilesystem() {
    var a = this; jl_Object.call(a);
    a.$fileMap = null;
    a.$database = null;
    a.$indexeddb = null;
}
function nles_VirtualFilesystem_openVFS($db) {
    var $evt, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$evt = $thread.pop();$db = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = nles_VirtualFilesystem$AsyncHandlers_openDB($db);
        if ($rt_suspending()) {
            break main;
        }
        $evt = $tmp;
        if ($evt.$failedInit) {
            $db = new nles_VirtualFilesystem$VFSHandle;
            var$3 = $evt.$failedError;
            var$4 = null;
            $db.$failedInit0 = 1;
            $db.$failedLocked = 0;
            $db.$failedError0 = var$3;
            $db.$vfs = var$4;
            return $db;
        }
        if ($evt.$failedLocked0) {
            $db = new nles_VirtualFilesystem$VFSHandle;
            var$3 = null;
            var$4 = null;
            $db.$failedInit0 = 0;
            $db.$failedLocked = 1;
            $db.$failedError0 = var$3;
            $db.$vfs = var$4;
            return $db;
        }
        var$3 = $evt.$failedError;
        if (var$3 !== null) {
            $db = new nles_VirtualFilesystem$VFSHandle;
            var$4 = null;
            $db.$failedInit0 = 0;
            $db.$failedLocked = 0;
            $db.$failedError0 = var$3;
            $db.$vfs = var$4;
            return $db;
        }
        var$5 = new nles_VirtualFilesystem$VFSHandle;
        var$3 = null;
        var$4 = new nles_VirtualFilesystem;
        $evt = $evt.$database0;
        var$6 = new ju_HashMap;
        var$7 = ju_HashMap_calculateCapacity(16);
        var$6.$elementCount = 0;
        var$8 = $rt_createArray(ju_HashMap$HashEntry, var$7);
        var$9 = var$8.data;
        var$6.$elementData = var$8;
        var$6.$loadFactor = 0.75;
        var$6.$threshold = var$9.length * 0.75 | 0;
        var$4.$fileMap = var$6;
        var$4.$database = $db;
        var$4.$indexeddb = $evt;
        var$5.$failedInit0 = 0;
        var$5.$failedLocked = 0;
        var$5.$failedError0 = var$3;
        var$5.$vfs = var$4;
        return var$5;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($db, $evt, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr);
}
function nles_VirtualFilesystem$VFSHandle() {
    var a = this; jl_Object.call(a);
    a.$failedInit0 = 0;
    a.$failedLocked = 0;
    a.$failedError0 = null;
    a.$vfs = null;
}
function nles_VirtualFilesystem$VFSHandle_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    if (!$this.$failedInit0) {
        if ($this.$failedLocked)
            return $rt_s(43);
        if ($this.$failedError0 !== null) {
            var$1 = new jl_StringBuilder;
            var$1.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(44));
            var$2 = $this.$failedError0;
            jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$2);
            var$2 = new jl_String;
            var$3 = var$1.$buffer;
            var$4 = var$1.$length;
            var$5 = $rt_createCharArray(var$4);
            var$6 = var$5.data;
            var$2.$characters = var$5;
            var$7 = 0;
            while (var$7 < var$4) {
                var$6[var$7] = var$3.data[var$7 + 0 | 0];
                var$7 = var$7 + 1 | 0;
            }
            return var$2;
        }
        var$1 = new jl_StringBuilder;
        var$1.$buffer = $rt_createCharArray(16);
        jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(45));
        var$2 = $this.$vfs.$database;
        jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$2);
        var$2 = new jl_String;
        var$3 = var$1.$buffer;
        var$4 = var$1.$length;
        var$5 = $rt_createCharArray(var$4);
        var$6 = var$5.data;
        var$2.$characters = var$5;
        var$7 = 0;
        while (var$7 < var$4) {
            var$6[var$7] = var$3.data[var$7 + 0 | 0];
            var$7 = var$7 + 1 | 0;
        }
        return var$2;
    }
    var$1 = new jl_StringBuilder;
    var$1.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(46));
    if ($this.$failedError0 === null)
        var$8 = $rt_s(47);
    else {
        var$2 = new jl_StringBuilder;
        var$2.$buffer = $rt_createCharArray(16);
        jl_AbstractStringBuilder_insert(var$2, var$2.$length, $rt_s(48));
        var$8 = $this.$failedError0;
        jl_AbstractStringBuilder_insert(var$2, var$2.$length, var$8);
        var$8 = new jl_String;
        var$3 = var$2.$buffer;
        var$4 = var$2.$length;
        var$5 = $rt_createCharArray(var$4);
        var$6 = var$5.data;
        var$8.$characters = var$5;
        var$7 = 0;
        while (var$7 < var$4) {
            var$6[var$7] = var$3.data[var$7 + 0 | 0];
            var$7 = var$7 + 1 | 0;
        }
    }
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$8);
    var$2 = new jl_String;
    var$3 = var$1.$buffer;
    var$7 = var$1.$length;
    var$5 = $rt_createCharArray(var$7);
    var$6 = var$5.data;
    var$2.$characters = var$5;
    var$4 = 0;
    while (var$4 < var$7) {
        var$6[var$4] = var$3.data[var$4 + 0 | 0];
        var$4 = var$4 + 1 | 0;
    }
    return var$2;
}
var otj_JSObject = $rt_classWithoutFields(0);
var otjde_EventTarget = $rt_classWithoutFields(0);
var otjde_FocusEventTarget = $rt_classWithoutFields(0);
var otjde_MouseEventTarget = $rt_classWithoutFields(0);
var otjde_KeyboardEventTarget = $rt_classWithoutFields(0);
var otjde_LoadEventTarget = $rt_classWithoutFields(0);
var otjde_GamepadEventTarget = $rt_classWithoutFields(0);
var otjb_WindowEventTarget = $rt_classWithoutFields(0);
var otjb_StorageProvider = $rt_classWithoutFields(0);
var otjc_JSArrayReader = $rt_classWithoutFields(0);
var otjb_Window = $rt_classWithoutFields();
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength0();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
var jl_AutoCloseable = $rt_classWithoutFields(0);
var ji_Closeable = $rt_classWithoutFields(0);
var ji_Flushable = $rt_classWithoutFields(0);
var ji_OutputStream = $rt_classWithoutFields();
function ji_OutputStream_write($this, $b, $off, $len) {
    var $i, var$5, var$6;
    $i = 0;
    while ($i < $len) {
        var$5 = $b.data;
        var$6 = $off + 1 | 0;
        $rt_putStdout(var$5[$off]);
        $i = $i + 1 | 0;
        $off = var$6;
    }
}
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out = null;
}
function ji_PrintStream() {
    var a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
function ji_PrintStream_print($this, $s, $begin, $end) {
    var $destBytes, $src, $overflow, var$7, var$8, var$9, var$10, var$11, var$12, var$13, $$je;
    $destBytes = $s.data;
    $end = $end - $begin | 0;
    $src = new jn_CharBufferOverArray;
    $overflow = $destBytes.length;
    $end = $begin + $end | 0;
    $src.$mark = (-1);
    $src.$capacity = $overflow;
    $src.$limit = $overflow;
    $src.$position = $begin;
    $src.$limit = $end;
    $src.$start0 = 0;
    $src.$readOnly = 0;
    $src.$array0 = $s;
    $end = 1024;
    if ($overflow < $end)
        $end = $overflow;
    if (16 > $end)
        $end = 16;
    $destBytes = $rt_createByteArray($end);
    $end = $destBytes.data.length;
    var$7 = new jn_ByteBufferImpl;
    var$8 = 0 + $end | 0;
    var$7.$mark = (-1);
    var$7.$capacity = $end;
    var$7.$limit = $end;
    var$7.$order = jn_ByteOrder_BIG_ENDIAN;
    var$7.$start1 = 0;
    var$7.$array1 = $destBytes;
    var$7.$position = 0;
    var$7.$limit = var$8;
    var$7.$direct = 0;
    var$7.$readOnly0 = 0;
    var$9 = $this.$charset;
    var$10 = new jnci_UTF8Encoder;
    $s = $rt_createByteArray(1);
    var$11 = $s.data;
    var$11[0] = 63;
    var$12 = jnc_CodingErrorAction_REPORT;
    var$10.$malformedAction = var$12;
    var$10.$unmappableAction = var$12;
    $begin = var$11.length;
    if ($begin && $begin >= var$10.$maxBytesPerChar) {
        var$10.$charset0 = var$9;
        var$10.$replacement = $s.$clone();
        var$10.$averageBytesPerChar = 2.0;
        var$10.$maxBytesPerChar = 4.0;
        var$10.$inArray = $rt_createCharArray(512);
        var$10.$outArray = $rt_createByteArray(512);
        var$9 = jnc_CodingErrorAction_REPLACE;
        if (var$9 === null) {
            var$7 = new jl_IllegalArgumentException;
            var$7.$suppressionEnabled = 1;
            var$7.$writableStackTrace = 1;
            var$7.$message = $rt_s(49);
            $rt_throw(var$7);
        }
        var$10.$malformedAction = var$9;
        var$10.$unmappableAction = var$9;
        while (true) {
            $overflow = (jnc_CharsetEncoder_encode(var$10, $src, var$7, 1)).$kind != 1 ? 0 : 1;
            var$13 = var$7.$position;
            var$9 = $this.$out;
            if (var$9 === null)
                $this.$errorState = 1;
            if ($this.$errorState ? 0 : 1)
                a: {
                    try {
                        ji_OutputStream_write(var$9, $destBytes, 0, var$13);
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ji_IOException) {
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$errorState = 1;
                }
            var$7.$position = 0;
            var$7.$limit = var$7.$capacity;
            var$7.$mark = (-1);
            if (!$overflow)
                break;
        }
        while (true) {
            $end = var$10.$status;
            if ($end != 2 && $end != 4) {
                var$9 = new jl_IllegalStateException;
                var$9.$suppressionEnabled = 1;
                var$9.$writableStackTrace = 1;
                $rt_throw(var$9);
            }
            var$9 = jnc_CoderResult_UNDERFLOW;
            if (var$9 === var$9)
                var$10.$status = 3;
            $overflow = var$9.$kind != 1 ? 0 : 1;
            var$13 = var$7.$position;
            var$9 = $this.$out;
            if (var$9 === null)
                $this.$errorState = 1;
            if ($this.$errorState ? 0 : 1)
                b: {
                    try {
                        ji_OutputStream_write(var$9, $destBytes, 0, var$13);
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ji_IOException) {
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$errorState = 1;
                }
            var$7.$position = 0;
            var$7.$limit = var$7.$capacity;
            var$7.$mark = (-1);
            if (!$overflow)
                break;
        }
        return;
    }
    var$7 = new jl_IllegalArgumentException;
    var$7.$suppressionEnabled = 1;
    var$7.$writableStackTrace = 1;
    var$7.$message = $rt_s(50);
    $rt_throw(var$7);
}
function ji_PrintStream_println($this, $s) {
    var var$2, var$3;
    var$2 = $this.$sb;
    jl_AbstractStringBuilder_insert(var$2, var$2.$length, $s === null ? $rt_s(8) : $s.$path);
    var$3 = var$2.$length;
    jl_AbstractStringBuilder_insertSpace(var$2, var$3, var$3 + 1 | 0);
    var$2.$buffer.data[var$3] = 10;
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_printSB($this) {
    var var$1, var$2, $buffer, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = $this.$sb;
    var$2 = var$1.$length;
    $buffer = $this.$buffer0;
    if (var$2 > $buffer.data.length)
        $buffer = $rt_createCharArray(var$2);
    var$4 = 0;
    var$5 = 0;
    if (var$4 > var$2) {
        var$1 = new jl_IndexOutOfBoundsException;
        var$1.$suppressionEnabled = 1;
        var$1.$writableStackTrace = 1;
        var$1.$message = $rt_s(51);
        $rt_throw(var$1);
    }
    while (var$4 < var$2) {
        var$6 = $buffer.data;
        var$7 = var$5 + 1 | 0;
        var$8 = var$1.$buffer.data;
        var$9 = var$4 + 1 | 0;
        var$6[var$5] = var$8[var$4];
        var$5 = var$7;
        var$4 = var$9;
    }
    ji_PrintStream_print($this, $buffer, 0, var$2);
    $this.$sb.$length = 0;
}
var otcic_StdoutOutputStream = $rt_classWithoutFields(ji_OutputStream);
var otcic_StdoutOutputStream_INSTANCE = null;
function otcic_StdoutOutputStream__clinit_() {
    otcic_StdoutOutputStream_INSTANCE = new otcic_StdoutOutputStream;
}
var oti_AsyncCallback = $rt_classWithoutFields(0);
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
function otpp_AsyncCallbackWrapper_create($realAsyncCallback) {
    var var$2;
    var$2 = new otpp_AsyncCallbackWrapper;
    var$2.$realAsyncCallback = $realAsyncCallback;
    return var$2;
}
function otpp_AsyncCallbackWrapper_complete($this, $result) {
    $this.$realAsyncCallback.$complete($result);
}
function otpp_AsyncCallbackWrapper_error($this, $e) {
    $this.$realAsyncCallback.$error($e);
}
var nles_SYS$PromiseHandler = $rt_classWithoutFields(0);
function nles_SYS$requestPersist$lambda$_2_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
function nles_SYS$requestPersist$lambda$_2_0_complete$exported$0(var$0, var$1) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = var$0.$_0;
        $ptr = 1;
    case 1:
        nles_SYS_$callClinit();
        if ($rt_suspending()) {
            break main;
        }
        var$3 = !(var$1 === null ? 0 : 1) ? nles_BooleanResult_FALSE : nles_BooleanResult_TRUE;
        var$2.$realAsyncCallback.$complete(var$3);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, var$2, var$3, $ptr);
}
var nles_VirtualFilesystem$AsyncHandlers = $rt_classWithoutFields();
function nles_VirtualFilesystem$AsyncHandlers_openDB(var$1) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            nles_VirtualFilesystem$AsyncHandlers_openDB0(var$1, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function nles_VirtualFilesystem$AsyncHandlers_openDB0($name, $cb) {
    var $i, $t, var$5, var$6, var$7, var$8, $f, var$10, var$11, var$12, var$13, var$14, var$15, $$je;
    $i = null;
    a: {
        try {
            $t = otji_IDBFactory_getInstance();
            $i = $t;
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                $t = $$je;
            } else {
                throw $$e;
            }
        }
        var$5 = new nles_VirtualFilesystem$DatabaseOpen;
        var$6 = $t.$message;
        var$7 = new jl_StringBuilder;
        var$7.$buffer = $rt_createCharArray(16);
        $t = $t.constructor;
        if ($t === null)
            var$8 = null;
        else {
            var$8 = $t.classObject;
            if (var$8 === null) {
                var$8 = new jl_Class;
                var$8.$platformClass = $t;
                $f = var$8;
                $t.classObject = $f;
            }
        }
        if (var$8.$name === null)
            var$8.$name = $rt_str(var$8.$platformClass.$meta.name);
        $t = var$8.$name;
        jl_AbstractStringBuilder_insert(var$7, var$7.$length, $t);
        if (var$6 === null)
            $t = $rt_s(47);
        else {
            $f = new jl_StringBuilder;
            $f.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert($f, $f.$length, $rt_s(11));
            jl_AbstractStringBuilder_insert($f, $f.$length, var$6);
            $t = new jl_String;
            var$10 = $f.$buffer;
            var$11 = $f.$length;
            var$12 = $rt_createCharArray(var$11);
            var$13 = var$12.data;
            $t.$characters = var$12;
            var$14 = 0;
            while (var$14 < var$11) {
                var$13[var$14] = var$10.data[var$14 + 0 | 0];
                var$14 = var$14 + 1 | 0;
            }
        }
        jl_AbstractStringBuilder_insert(var$7, var$7.$length, $t);
        $t = new jl_String;
        var$13 = var$7.$buffer;
        var$14 = var$7.$length;
        var$10 = $rt_createCharArray(var$14);
        var$12 = var$10.data;
        $t.$characters = var$10;
        var$15 = 0;
        while (var$15 < var$14) {
            var$12[var$15] = var$13.data[var$15 + 0 | 0];
            var$15 = var$15 + 1 | 0;
        }
        $f = null;
        var$5.$failedInit = 1;
        var$5.$failedLocked0 = 0;
        var$5.$failedError = $t;
        var$5.$database0 = $f;
        $cb.$realAsyncCallback.$complete(var$5);
        $t = $i;
    }
    $f = $t.open($rt_ustr($name), 1);
    $name = new nles_VirtualFilesystem$AsyncHandlers$1;
    $name.$val$cb = $cb;
    $name = otji_JS_function($name, "handleEvent");
    $f.onBlocked = $name;
    $name = new nles_VirtualFilesystem$AsyncHandlers$2;
    $name.$val$cb0 = $cb;
    $name.$val$f = $f;
    $name = otji_JS_function($name, "handleEvent");
    $f.onsuccess = $name;
    $name = new nles_VirtualFilesystem$AsyncHandlers$3;
    $name.$val$cb1 = $cb;
    $name = otji_JS_function($name, "handleEvent");
    $f.onerror = $name;
    $name = new nles_VirtualFilesystem$AsyncHandlers$4;
    $name.$val$f0 = $f;
    $name = otji_JS_function($name, "handleEvent");
    $f.onupgradeneeded = $name;
}
function nles_VirtualFilesystem$DatabaseOpen() {
    var a = this; jl_Object.call(a);
    a.$failedInit = 0;
    a.$failedLocked0 = 0;
    a.$failedError = null;
    a.$database0 = null;
}
var jl_Iterable = $rt_classWithoutFields(0);
var ju_Collection = $rt_classWithoutFields(0);
var ju_AbstractCollection = $rt_classWithoutFields();
function ju_AbstractCollection_toArray($this, $a) {
    var var$2, $i, $i_0, var$5, $iter$index, var$7, var$8, var$9, $iter$index_0;
    var$2 = $a.data;
    $i = $this.$size;
    $i_0 = var$2.length;
    if ($i_0 >= $i)
        while ($i < $i_0) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    else {
        var$5 = $a.constructor;
        if (var$5 === null)
            $a = null;
        else {
            $a = var$5.classObject;
            if ($a === null) {
                $a = new jl_Class;
                $a.$platformClass = var$5;
                var$2 = $a;
                var$5.classObject = var$2;
            }
        }
        $a = jl_Class_getComponentType($a);
        if ($a === null) {
            $a = new jl_NullPointerException;
            $a.$suppressionEnabled = 1;
            $a.$writableStackTrace = 1;
            $rt_throw($a);
        }
        if ($a === $rt_cls($rt_voidcls())) {
            $a = new jl_IllegalArgumentException;
            $a.$suppressionEnabled = 1;
            $a.$writableStackTrace = 1;
            $rt_throw($a);
        }
        if ($i < 0) {
            $a = new jl_NegativeArraySizeException;
            $a.$suppressionEnabled = 1;
            $a.$writableStackTrace = 1;
            $rt_throw($a);
        }
        $a = jlr_Array_newInstanceImpl($a.$platformClass, $i);
    }
    $i_0 = 0;
    $iter$index = 0;
    var$7 = $this.$modCount;
    var$8 = $this.$size;
    $i = $rt_compare(var$7, var$7);
    a: {
        while (true) {
            var$9 = $rt_compare($iter$index, var$8);
            if (!(var$9 >= 0 ? 0 : 1))
                break;
            var$7 = $i_0 + 1 | 0;
            if ($i < 0) {
                $a = new ju_ConcurrentModificationException;
                $a.$suppressionEnabled = 1;
                $a.$writableStackTrace = 1;
                $rt_throw($a);
            }
            $iter$index_0 = $iter$index + 1 | 0;
            if ($iter$index < 0)
                break a;
            if (var$9 >= 0)
                break a;
            $a.data[$i_0] = $this.$array.data[$iter$index];
            $i_0 = var$7;
            $iter$index = $iter$index_0;
        }
        return $a;
    }
    $a = new jl_IndexOutOfBoundsException;
    $a.$suppressionEnabled = 1;
    $a.$writableStackTrace = 1;
    $rt_throw($a);
}
var ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
var jl_Cloneable = $rt_classWithoutFields(0);
var ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size = 0;
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var var$2, var$3, var$4, $newLength, var$6, var$7, var$8, var$9;
    var$2 = $this.$array;
    var$3 = var$2.data;
    var$4 = var$3.length;
    if (var$4 < $minCapacity) {
        if (var$4 >= 1073741823)
            $newLength = 2147483647;
        else {
            var$6 = var$4 * 2 | 0;
            $newLength = 5;
            if (var$6 > $newLength)
                $newLength = var$6;
            if ($minCapacity > $newLength)
                $newLength = $minCapacity;
        }
        var$7 = var$2.constructor;
        if (var$7 === null)
            var$8 = null;
        else {
            var$8 = var$7.classObject;
            if (var$8 === null) {
                var$8 = new jl_Class;
                var$8.$platformClass = var$7;
                var$9 = var$8;
                var$7.classObject = var$9;
            }
        }
        var$7 = jl_Class_getComponentType(var$8);
        if (var$7 === null) {
            var$8 = new jl_NullPointerException;
            var$8.$suppressionEnabled = 1;
            var$8.$writableStackTrace = 1;
            $rt_throw(var$8);
        }
        if (var$7 === $rt_cls($rt_voidcls())) {
            var$8 = new jl_IllegalArgumentException;
            var$8.$suppressionEnabled = 1;
            var$8.$writableStackTrace = 1;
            $rt_throw(var$8);
        }
        if ($newLength < 0) {
            var$8 = new jl_NegativeArraySizeException;
            var$8.$suppressionEnabled = 1;
            var$8.$writableStackTrace = 1;
            $rt_throw(var$8);
        }
        var$9 = jlr_Array_newInstanceImpl(var$7.$platformClass, $newLength);
        if ($newLength < var$4)
            var$4 = $newLength;
        $minCapacity = 0;
        while ($minCapacity < var$4) {
            var$9.data[$minCapacity] = var$3[$minCapacity];
            $minCapacity = $minCapacity + 1 | 0;
        }
        $this.$array = var$9;
    }
}
function ju_ArrayList_get($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$size)
        return $this.$array.data[$index];
    var$2 = new jl_IndexOutOfBoundsException;
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    $rt_throw(var$2);
}
function ju_ArrayList_size($this) {
    return $this.$size;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size;
    $this.$size = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
}
function ju_ArrayList_add0($this, $index, $element) {
    var var$3, $i, var$5;
    if ($index >= 0) {
        var$3 = $this.$size;
        if ($index <= var$3) {
            ju_ArrayList_ensureCapacity($this, var$3 + 1 | 0);
            var$3 = $this.$size;
            $i = var$3;
            while ($i > $index) {
                var$5 = $this.$array.data;
                var$5[$i] = var$5[$i - 1 | 0];
                $i = $i + (-1) | 0;
            }
            $this.$array.data[$index] = $element;
            $this.$size = var$3 + 1 | 0;
            $this.$modCount = $this.$modCount + 1 | 0;
            return;
        }
    }
    $element = new jl_IndexOutOfBoundsException;
    $element.$suppressionEnabled = 1;
    $element.$writableStackTrace = 1;
    $rt_throw($element);
}
function ju_ArrayList_remove($this, $i) {
    var var$2, var$3, $old, $i_0;
    if ($i >= 0) {
        var$2 = $this.$size;
        if ($i < var$2) {
            var$3 = $this.$array.data;
            $old = var$3[$i];
            var$2 = var$2 - 1 | 0;
            $this.$size = var$2;
            while ($i < var$2) {
                $i_0 = $i + 1 | 0;
                var$3[$i] = var$3[$i_0];
                $i = $i_0;
            }
            var$3[var$2] = null;
            $this.$modCount = $this.$modCount + 1 | 0;
            return $old;
        }
    }
    $old = new jl_IndexOutOfBoundsException;
    $old.$suppressionEnabled = 1;
    $old.$writableStackTrace = 1;
    $rt_throw($old);
}
function ju_ArrayList_checkIndex($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$size)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    $rt_throw(var$2);
}
function jnc_Charset() {
    var a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
function jnc_Charset_checkCanonicalName($name) {
    var var$2, $c, var$4, $i;
    var$2 = $name.$characters.data;
    $c = var$2.length;
    if ($c ? 0 : 1) {
        var$4 = new jnc_IllegalCharsetNameException;
        var$4.$suppressionEnabled = 1;
        var$4.$writableStackTrace = 1;
        var$4.$charsetName = $name;
        $rt_throw(var$4);
    }
    if (0 >= $c) {
        $name = new jl_StringIndexOutOfBoundsException;
        $name.$suppressionEnabled = 1;
        $name.$writableStackTrace = 1;
        $rt_throw($name);
    }
    if (!jnc_Charset_isValidCharsetStart(var$2[0])) {
        var$4 = new jnc_IllegalCharsetNameException;
        var$4.$suppressionEnabled = 1;
        var$4.$writableStackTrace = 1;
        var$4.$charsetName = $name;
        $rt_throw(var$4);
    }
    $i = 1;
    a: {
        while (true) {
            var$2 = $name.$characters.data;
            $c = $rt_compare($i, var$2.length);
            if ($c >= 0)
                break;
            if ($i < 0)
                break a;
            if ($c >= 0)
                break a;
            b: {
                $c = var$2[$i];
                switch ($c) {
                    case 43:
                    case 45:
                    case 46:
                    case 58:
                    case 95:
                        break;
                    default:
                        if (jnc_Charset_isValidCharsetStart($c))
                            break b;
                        else {
                            var$4 = new jnc_IllegalCharsetNameException;
                            var$4.$suppressionEnabled = 1;
                            var$4.$writableStackTrace = 1;
                            var$4.$charsetName = $name;
                            $rt_throw(var$4);
                        }
                }
            }
            $i = $i + 1 | 0;
        }
        return;
    }
    $name = new jl_StringIndexOutOfBoundsException;
    $name.$suppressionEnabled = 1;
    $name.$writableStackTrace = 1;
    $rt_throw($name);
}
function jnc_Charset_isValidCharsetStart($c) {
    a: {
        b: {
            if (!($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122)) {
                if ($c < 65)
                    break b;
                if ($c > 90)
                    break b;
            }
            $c = 1;
            break a;
        }
        $c = 0;
    }
    return $c;
}
var jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset);
var jnci_UTF8Charset_INSTANCE = null;
function jnci_UTF8Charset__clinit_() {
    var var$1, var$2, var$3, var$4, var$5;
    var$1 = new jnci_UTF8Charset;
    var$2 = $rt_createArray(jl_String, 0);
    var$3 = var$2.data;
    jnc_Charset_checkCanonicalName($rt_s(2));
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        jnc_Charset_checkCanonicalName(var$3[var$5]);
        var$5 = var$5 + 1 | 0;
    }
    var$1.$canonicalName = $rt_s(2);
    var$1.$aliases = var$2.$clone();
    jnci_UTF8Charset_INSTANCE = var$1;
}
var otji_EventHandler = $rt_classWithoutFields(0);
function nles_VirtualFilesystem$AsyncHandlers$1() {
    jl_Object.call(this);
    this.$val$cb = null;
}
function nles_VirtualFilesystem$AsyncHandlers$1_handleEvent$exported$0(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$val$cb;
    var$2 = new nles_VirtualFilesystem$DatabaseOpen;
    var$3 = null;
    var$4 = null;
    var$2.$failedInit = 0;
    var$2.$failedLocked0 = 1;
    var$2.$failedError = var$3;
    var$2.$database0 = var$4;
    var$1.$realAsyncCallback.$complete(var$2);
}
function nles_VirtualFilesystem$AsyncHandlers$2() {
    var a = this; jl_Object.call(a);
    a.$val$cb0 = null;
    a.$val$f = null;
}
function nles_VirtualFilesystem$AsyncHandlers$2_handleEvent$exported$0(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$val$cb0;
    var$2 = new nles_VirtualFilesystem$DatabaseOpen;
    var$3 = null;
    var$4 = var$0.$val$f.result;
    var$2.$failedInit = 0;
    var$2.$failedLocked0 = 0;
    var$2.$failedError = var$3;
    var$2.$database0 = var$4;
    var$1.$realAsyncCallback.$complete(var$2);
}
function nles_VirtualFilesystem$AsyncHandlers$3() {
    jl_Object.call(this);
    this.$val$cb1 = null;
}
function nles_VirtualFilesystem$AsyncHandlers$3_handleEvent$exported$0(var$0) {
    var var$1, var$2, var$3;
    var$1 = var$0.$val$cb1;
    var$2 = new nles_VirtualFilesystem$DatabaseOpen;
    var$3 = null;
    var$2.$failedInit = 0;
    var$2.$failedLocked0 = 0;
    var$2.$failedError = $rt_s(52);
    var$2.$database0 = var$3;
    var$1.$realAsyncCallback.$complete(var$2);
}
var otjde_EventListener = $rt_classWithoutFields(0);
function nles_VirtualFilesystem$AsyncHandlers$4() {
    jl_Object.call(this);
    this.$val$f0 = null;
}
function nles_VirtualFilesystem$AsyncHandlers$4_handleEvent$exported$0(var$0, var$1) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$2 = var$0.$val$f0.result;
    var$3 = otji_IDBObjectStoreParameters_create$js_body$_1();
    var$4 = $rt_createArray(jl_String, 1).data;
    var$4[0] = $rt_s(53);
    var$5 = var$4.length;
    var$6 = new Array(var$5);
    var$7 = 0;
    while (var$7 < var$5) {
        var$8 = $rt_ustr(var$4[var$7]);
        var$6[var$7] = var$8;
        var$7 = var$7 + 1 | 0;
    }
    var$3.keyPath = var$6;
    var$2.createObjectStore("filesystem", var$3);
}
var otji_IDBFactory = $rt_classWithoutFields();
function otji_IDBFactory_getInstance() {
    var $factory, var$2;
    $factory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!(typeof $factory === 'undefined' ? 1 : 0))
        return $factory;
    var$2 = new jl_IllegalStateException;
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    var$2.$message = $rt_s(54);
    $rt_throw(var$2);
}
var ju_Map = $rt_classWithoutFields(0);
var ju_AbstractMap = $rt_classWithoutFields();
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
function ju_HashMap_calculateCapacity($x) {
    var var$2;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    $x = var$2 | var$2 >> 1;
    $x = $x | $x >> 2;
    $x = $x | $x >> 4;
    $x = $x | $x >> 8;
    return ($x | $x >> 16) + 1 | 0;
}
var jl_IllegalStateException = $rt_classWithoutFields(jl_Exception);
var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
var jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception);
var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
var ju_Map$Entry = $rt_classWithoutFields(0);
var ju_MapEntry = $rt_classWithoutFields();
var ju_HashMap$HashEntry = $rt_classWithoutFields(ju_MapEntry);
function jn_Buffer() {
    var a = this; jl_Object.call(a);
    a.$capacity = 0;
    a.$position = 0;
    a.$limit = 0;
    a.$mark = 0;
}
function jn_Buffer_position($this, $newPosition) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    if ($newPosition >= 0 && $newPosition <= $this.$limit) {
        $this.$position = $newPosition;
        if ($newPosition < $this.$mark)
            $this.$mark = 0;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    var$3 = new jl_StringBuilder;
    var$3.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(55));
    jl_AbstractStringBuilder_insert0(var$3, var$3.$length, $newPosition, 10);
    jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(56));
    $newPosition = $this.$limit;
    jl_AbstractStringBuilder_insert0(var$3, var$3.$length, $newPosition, 10);
    jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(57));
    var$4 = new jl_String;
    var$5 = var$3.$buffer;
    var$6 = var$3.$length;
    var$7 = $rt_createCharArray(var$6);
    var$8 = var$7.data;
    var$4.$characters = var$7;
    var$9 = 0;
    while (var$9 < var$6) {
        var$8[var$9] = var$5.data[var$9 + 0 | 0];
        var$9 = var$9 + 1 | 0;
    }
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    var$2.$message = var$4;
    $rt_throw(var$2);
}
var jl_Readable = $rt_classWithoutFields(0);
var jn_CharBuffer = $rt_classWithoutFields(jn_Buffer);
function jn_CharBuffer_get($this, $dst, $offset, $length) {
    var var$4, var$5, $i, var$7, var$8, var$9, var$10, $pos, var$12, var$13;
    if ($offset >= 0) {
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            $i = $offset + $length | 0;
            if ($i > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = new jl_StringBuilder;
                var$8.$buffer = $rt_createCharArray(16);
                jl_AbstractStringBuilder_insert(var$8, var$8.$length, $rt_s(58));
                jl_AbstractStringBuilder_insert0(var$8, var$8.$length, $i, 10);
                jl_AbstractStringBuilder_insert(var$8, var$8.$length, $rt_s(59));
                jl_AbstractStringBuilder_insert0(var$8, var$8.$length, var$5, 10);
                var$9 = new jl_String;
                $dst = var$8.$buffer;
                $length = var$8.$length;
                var$4 = $rt_createCharArray($length);
                var$10 = var$4.data;
                var$9.$characters = var$4;
                var$5 = 0;
                while (var$5 < $length) {
                    var$10[var$5] = $dst.data[var$5 + 0 | 0];
                    var$5 = var$5 + 1 | 0;
                }
                var$7.$suppressionEnabled = 1;
                var$7.$writableStackTrace = 1;
                var$7.$message = var$9;
                $rt_throw(var$7);
            }
            var$5 = $this.$limit;
            $pos = $this.$position;
            if ((var$5 - $pos | 0) < $length) {
                var$7 = new jn_BufferUnderflowException;
                var$7.$suppressionEnabled = 1;
                var$7.$writableStackTrace = 1;
                $rt_throw(var$7);
            }
            if ($length >= 0) {
                $i = 0;
                var$12 = $pos;
                while ($i < $length) {
                    var$13 = $offset + 1 | 0;
                    var$5 = var$12 + 1 | 0;
                    var$4[$offset] = $this.$array0.data[var$12 + $this.$start0 | 0];
                    $i = $i + 1 | 0;
                    $offset = var$13;
                    var$12 = var$5;
                }
                $this.$position = $pos + $length | 0;
                return $this;
            }
            var$7 = new jl_IndexOutOfBoundsException;
            var$8 = new jl_StringBuilder;
            var$8.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert(var$8, var$8.$length, $rt_s(60));
            jl_AbstractStringBuilder_insert0(var$8, var$8.$length, $length, 10);
            jl_AbstractStringBuilder_insert(var$8, var$8.$length, $rt_s(61));
            var$9 = new jl_String;
            $dst = var$8.$buffer;
            $length = var$8.$length;
            var$4 = $rt_createCharArray($length);
            var$10 = var$4.data;
            var$9.$characters = var$4;
            var$5 = 0;
            while (var$5 < $length) {
                var$10[var$5] = $dst.data[var$5 + 0 | 0];
                var$5 = var$5 + 1 | 0;
            }
            var$7.$suppressionEnabled = 1;
            var$7.$writableStackTrace = 1;
            var$7.$message = var$9;
            $rt_throw(var$7);
        }
    }
    $dst = $dst.data;
    var$8 = new jl_IndexOutOfBoundsException;
    var$7 = new jl_StringBuilder;
    var$7.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert(var$7, var$7.$length, $rt_s(62));
    jl_AbstractStringBuilder_insert0(var$7, var$7.$length, $offset, 10);
    jl_AbstractStringBuilder_insert(var$7, var$7.$length, $rt_s(56));
    $offset = $dst.length;
    jl_AbstractStringBuilder_insert0(var$7, var$7.$length, $offset, 10);
    jl_AbstractStringBuilder_insert(var$7, var$7.$length, $rt_s(63));
    var$9 = new jl_String;
    $dst = var$7.$buffer;
    $length = var$7.$length;
    var$4 = $rt_createCharArray($length);
    var$10 = var$4.data;
    var$9.$characters = var$4;
    var$5 = 0;
    while (var$5 < $length) {
        var$10[var$5] = $dst.data[var$5 + 0 | 0];
        var$5 = var$5 + 1 | 0;
    }
    var$8.$suppressionEnabled = 1;
    var$8.$writableStackTrace = 1;
    var$8.$message = var$9;
    $rt_throw(var$8);
}
var jl_Math = $rt_classWithoutFields();
function jn_ByteBuffer() {
    var a = this; jn_Buffer.call(a);
    a.$start1 = 0;
    a.$array1 = null;
    a.$order = null;
}
function jn_ByteBuffer_put($this, $src, $offset, $length) {
    var var$4, var$5, var$6, var$7, $pos, var$9, var$10, var$11, $i, var$13;
    if (!$length)
        return $this;
    if ($this.$readOnly0) {
        var$4 = new jn_ReadOnlyBufferException;
        var$4.$suppressionEnabled = 1;
        var$4.$writableStackTrace = 1;
        $rt_throw(var$4);
    }
    var$5 = $this.$limit;
    var$6 = $this.$position;
    if ((var$5 - var$6 | 0) < $length) {
        var$4 = new jn_BufferOverflowException;
        var$4.$suppressionEnabled = 1;
        var$4.$writableStackTrace = 1;
        $rt_throw(var$4);
    }
    if ($offset >= 0) {
        var$7 = $src.data;
        var$5 = var$7.length;
        if ($offset < var$5) {
            $pos = $offset + $length | 0;
            if ($pos > var$5) {
                var$4 = new jl_IndexOutOfBoundsException;
                var$9 = new jl_StringBuilder;
                var$9.$buffer = $rt_createCharArray(16);
                jl_AbstractStringBuilder_insert(var$9, var$9.$length, $rt_s(64));
                jl_AbstractStringBuilder_insert0(var$9, var$9.$length, $pos, 10);
                jl_AbstractStringBuilder_insert(var$9, var$9.$length, $rt_s(59));
                jl_AbstractStringBuilder_insert0(var$9, var$9.$length, var$5, 10);
                var$10 = new jl_String;
                $src = var$9.$buffer;
                $length = var$9.$length;
                var$7 = $rt_createCharArray($length);
                var$11 = var$7.data;
                var$10.$characters = var$7;
                var$5 = 0;
                while (var$5 < $length) {
                    var$11[var$5] = $src.data[var$5 + 0 | 0];
                    var$5 = var$5 + 1 | 0;
                }
                var$4.$suppressionEnabled = 1;
                var$4.$writableStackTrace = 1;
                var$4.$message = var$10;
                $rt_throw(var$4);
            }
            if ($length >= 0) {
                $pos = var$6 + $this.$start1 | 0;
                $i = 0;
                while ($i < $length) {
                    $src = $this.$array1.data;
                    var$13 = $pos + 1 | 0;
                    var$5 = $offset + 1 | 0;
                    $src[$pos] = var$7[$offset];
                    $i = $i + 1 | 0;
                    $pos = var$13;
                    $offset = var$5;
                }
                $this.$position = var$6 + $length | 0;
                return $this;
            }
            var$4 = new jl_IndexOutOfBoundsException;
            var$9 = new jl_StringBuilder;
            var$9.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert(var$9, var$9.$length, $rt_s(60));
            jl_AbstractStringBuilder_insert0(var$9, var$9.$length, $length, 10);
            jl_AbstractStringBuilder_insert(var$9, var$9.$length, $rt_s(61));
            var$10 = new jl_String;
            $src = var$9.$buffer;
            $length = var$9.$length;
            var$7 = $rt_createCharArray($length);
            var$11 = var$7.data;
            var$10.$characters = var$7;
            var$5 = 0;
            while (var$5 < $length) {
                var$11[var$5] = $src.data[var$5 + 0 | 0];
                var$5 = var$5 + 1 | 0;
            }
            var$4.$suppressionEnabled = 1;
            var$4.$writableStackTrace = 1;
            var$4.$message = var$10;
            $rt_throw(var$4);
        }
    }
    $src = $src.data;
    var$9 = new jl_IndexOutOfBoundsException;
    var$4 = new jl_StringBuilder;
    var$4.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert(var$4, var$4.$length, $rt_s(62));
    jl_AbstractStringBuilder_insert0(var$4, var$4.$length, $offset, 10);
    jl_AbstractStringBuilder_insert(var$4, var$4.$length, $rt_s(56));
    $offset = $src.length;
    jl_AbstractStringBuilder_insert0(var$4, var$4.$length, $offset, 10);
    jl_AbstractStringBuilder_insert(var$4, var$4.$length, $rt_s(63));
    var$10 = new jl_String;
    $src = var$4.$buffer;
    $length = var$4.$length;
    var$7 = $rt_createCharArray($length);
    var$11 = var$7.data;
    var$10.$characters = var$7;
    var$5 = 0;
    while (var$5 < $length) {
        var$11[var$5] = $src.data[var$5 + 0 | 0];
        var$5 = var$5 + 1 | 0;
    }
    var$9.$suppressionEnabled = 1;
    var$9.$writableStackTrace = 1;
    var$9.$message = var$10;
    $rt_throw(var$9);
}
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name0 = null;
}
var jnc_CodingErrorAction_IGNORE = null;
var jnc_CodingErrorAction_REPLACE = null;
var jnc_CodingErrorAction_REPORT = null;
function jnc_CodingErrorAction__clinit_() {
    var var$1;
    var$1 = new jnc_CodingErrorAction;
    var$1.$name0 = $rt_s(3);
    jnc_CodingErrorAction_IGNORE = var$1;
    var$1 = new jnc_CodingErrorAction;
    var$1.$name0 = $rt_s(4);
    jnc_CodingErrorAction_REPLACE = var$1;
    var$1 = new jnc_CodingErrorAction;
    var$1.$name0 = $rt_s(5);
    jnc_CodingErrorAction_REPORT = var$1;
}
var jn_CharBufferImpl = $rt_classWithoutFields(jn_CharBuffer);
function jn_CharBufferOverArray() {
    var a = this; jn_CharBufferImpl.call(a);
    a.$readOnly = 0;
    a.$start0 = 0;
    a.$array0 = null;
}
function jnc_CharsetEncoder() {
    var a = this; jl_Object.call(a);
    a.$charset0 = null;
    a.$replacement = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$status = 0;
}
function jnc_CharsetEncoder_encode($this, $in, $out, $endOfInput) {
    var $remaining, $result, $e, $action, var$8, var$9, var$10, $$je;
    a: {
        $remaining = $this.$status;
        if ($remaining != 3) {
            if ($endOfInput)
                break a;
            if ($remaining != 2)
                break a;
        }
        $in = new jl_IllegalStateException;
        $in.$suppressionEnabled = 1;
        $in.$writableStackTrace = 1;
        $rt_throw($in);
    }
    $this.$status = !$endOfInput ? 1 : 2;
    while (true) {
        try {
            $result = jnci_BufferedEncoder_encodeLoop($this, $in, $out);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $in = new jnc_CoderMalfunctionError;
                $in.$suppressionEnabled = 1;
                $in.$writableStackTrace = 1;
                $in.$cause = $e;
                $rt_throw($in);
            } else {
                throw $$e;
            }
        }
        $remaining = $result.$kind;
        if ($remaining ? 0 : 1) {
            if (!$endOfInput)
                return $result;
            $remaining = $in.$limit - $in.$position | 0;
            if ($remaining <= 0)
                return $result;
            $result = new jnc_CoderResult;
            $result.$kind = 2;
            $result.$length0 = $remaining;
        } else if ($remaining != 1 ? 0 : 1)
            break;
        $action = !($result.$kind != 3 ? 0 : 1) ? $this.$malformedAction : $this.$unmappableAction;
        b: {
            if ($action !== jnc_CodingErrorAction_REPLACE) {
                if ($action === jnc_CodingErrorAction_IGNORE)
                    break b;
                else
                    return $result;
            }
            var$8 = $out.$limit - $out.$position | 0;
            var$9 = $this.$replacement;
            $remaining = var$9.data.length;
            if (var$8 < $remaining)
                return jnc_CoderResult_OVERFLOW;
            jn_ByteBuffer_put($out, var$9, 0, $remaining);
        }
        var$10 = $in.$position;
        $remaining = $result.$kind;
        var$8 = $remaining != 2 ? 0 : 1;
        if (!(!var$8 && !($remaining != 3 ? 0 : 1) ? 0 : 1)) {
            $in = new jl_UnsupportedOperationException;
            $in.$suppressionEnabled = 1;
            $in.$writableStackTrace = 1;
            $rt_throw($in);
        }
        jn_Buffer_position($in, var$10 + $result.$length0 | 0);
    }
    return $result;
}
function jnc_CoderResult() {
    var a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length0 = 0;
}
var jnc_CoderResult_UNDERFLOW = null;
var jnc_CoderResult_OVERFLOW = null;
function jnc_CoderResult__clinit_() {
    var var$1;
    var$1 = new jnc_CoderResult;
    var$1.$kind = 0;
    var$1.$length0 = 0;
    jnc_CoderResult_UNDERFLOW = var$1;
    var$1 = new jnc_CoderResult;
    var$1.$kind = 1;
    var$1.$length0 = 0;
    jnc_CoderResult_OVERFLOW = var$1;
}
function jn_ByteBufferImpl() {
    var a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly0 = 0;
}
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name1 = null;
}
var jn_ByteOrder_BIG_ENDIAN = null;
var jn_ByteOrder_LITTLE_ENDIAN = null;
function jn_ByteOrder__clinit_() {
    var var$1;
    var$1 = new jn_ByteOrder;
    var$1.$name1 = $rt_s(6);
    jn_ByteOrder_BIG_ENDIAN = var$1;
    var$1 = new jn_ByteOrder;
    var$1.$name1 = $rt_s(7);
    jn_ByteOrder_LITTLE_ENDIAN = var$1;
}
function jur_Pattern() {
    var a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount = 0;
    a.$consCount = 0;
    a.$start2 = null;
}
function jur_Pattern_split($this, $inputSeq, $limit) {
    var $res, $mat, $index, $curPos, var$7, var$8, var$9, var$10, var$11, var$12;
    $res = new ju_ArrayList;
    $res.$array = $rt_createArray(jl_Object, 10);
    $mat = jur_Matcher__init_($this, $inputSeq);
    $index = 0;
    $curPos = 0;
    if (!$inputSeq.$characters.data.length) {
        var$7 = $rt_createArray(jl_String, 1);
        var$7.data[0] = $rt_s(47);
        return var$7;
    }
    a: {
        while (true) {
            if (!jur_Matcher_find($mat))
                break a;
            var$8 = $index + 1 | 0;
            if (var$8 >= $limit && $limit > 0)
                break a;
            var$9 = $mat.$matchResult;
            if (!var$9.$valid) {
                $inputSeq = new jl_IllegalStateException;
                $inputSeq.$suppressionEnabled = 1;
                $inputSeq.$writableStackTrace = 1;
                $rt_throw($inputSeq);
            }
            if (0 >= var$9.$groupCount) {
                $inputSeq = new jl_IndexOutOfBoundsException;
                $res = new jl_StringBuilder;
                jl_Object__init_0($res);
                $res.$buffer = $rt_createCharArray(16);
                jl_AbstractStringBuilder_insert0($res, $res.$length, 0, 10);
                $mat = new jl_String;
                var$7 = $res.$buffer;
                $index = $res.$length;
                var$10 = $rt_createCharArray($index);
                var$11 = var$10.data;
                $mat.$characters = var$10;
                var$8 = 0;
                while (var$8 < $index) {
                    var$11[var$8] = var$7.data[var$8 + 0 | 0];
                    var$8 = var$8 + 1 | 0;
                }
                $inputSeq.$suppressionEnabled = 1;
                $inputSeq.$writableStackTrace = 1;
                $inputSeq.$message = $mat;
                $rt_throw($inputSeq);
            }
            var$12 = var$9.$groupBounds.data[0];
            if ($curPos > var$12) {
                $inputSeq = new jl_IndexOutOfBoundsException;
                $inputSeq.$suppressionEnabled = 1;
                $inputSeq.$writableStackTrace = 1;
                $rt_throw($inputSeq);
            }
            var$9 = new jl_String;
            var$7 = $inputSeq.$characters;
            $index = var$12 - $curPos | 0;
            var$10 = $rt_createCharArray($index);
            var$11 = var$10.data;
            var$9.$characters = var$10;
            var$12 = 0;
            while (var$12 < $index) {
                var$11[var$12] = var$7.data[var$12 + $curPos | 0];
                var$12 = var$12 + 1 | 0;
            }
            ju_ArrayList_ensureCapacity($res, $res.$size + 1 | 0);
            var$7 = $res.$array.data;
            var$12 = $res.$size;
            $res.$size = var$12 + 1 | 0;
            var$7[var$12] = var$9;
            $res.$modCount = $res.$modCount + 1 | 0;
            var$9 = $mat.$matchResult;
            if (!var$9.$valid)
                break;
            if (0 >= var$9.$groupCount) {
                $inputSeq = new jl_IndexOutOfBoundsException;
                $res = new jl_StringBuilder;
                jl_Object__init_0($res);
                $res.$buffer = $rt_createCharArray(16);
                jl_AbstractStringBuilder_insert0($res, $res.$length, 0, 10);
                $res = jl_StringBuilder_toString($res);
                $inputSeq.$suppressionEnabled = 1;
                $inputSeq.$writableStackTrace = 1;
                $inputSeq.$message = $res;
                $rt_throw($inputSeq);
            }
            $curPos = var$9.$groupBounds.data[1];
            $index = var$8;
        }
        $inputSeq = new jl_IllegalStateException;
        $inputSeq.$suppressionEnabled = 1;
        $inputSeq.$writableStackTrace = 1;
        $rt_throw($inputSeq);
    }
    var$11 = $inputSeq.$characters.data;
    var$12 = var$11.length;
    if ($curPos > var$12) {
        $inputSeq = new jl_IndexOutOfBoundsException;
        $inputSeq.$suppressionEnabled = 1;
        $inputSeq.$writableStackTrace = 1;
        $rt_throw($inputSeq);
    }
    $inputSeq = new jl_String;
    var$8 = var$12 - $curPos | 0;
    var$7 = $rt_createCharArray(var$8);
    var$10 = var$7.data;
    $inputSeq.$characters = var$7;
    var$12 = 0;
    while (var$12 < var$8) {
        var$10[var$12] = var$11[var$12 + $curPos | 0];
        var$12 = var$12 + 1 | 0;
    }
    b: {
        ju_ArrayList_ensureCapacity($res, $res.$size + 1 | 0);
        var$7 = $res.$array.data;
        var$8 = $res.$size;
        $res.$size = var$8 + 1 | 0;
        var$7[var$8] = $inputSeq;
        $res.$modCount = $res.$modCount + 1 | 0;
        $index = $index + 1 | 0;
        if (!$limit)
            while (true) {
                $index = $index + (-1) | 0;
                if ($index < 0)
                    break;
                ju_ArrayList_checkIndex($res, $index);
                if (jl_String_length($res.$array.data[$index]))
                    break b;
                ju_ArrayList_remove($res, $index);
            }
    }
    if ($index < 0)
        $index = 0;
    return ju_AbstractCollection_toArray($res, $rt_createArray(jl_String, $index));
}
function jur_Pattern_pattern($this) {
    return $this.$lexemes.$orig;
}
function jur_Pattern_compile($pattern, $flags) {
    var var$3;
    if ($pattern === null) {
        $pattern = new jl_NullPointerException;
        $pattern.$suppressionEnabled = 1;
        $pattern.$writableStackTrace = 1;
        $pattern.$message = $rt_s(65);
        $rt_throw($pattern);
    }
    if ($flags && ($flags | 255) != 255) {
        $pattern = new jl_IllegalArgumentException;
        $pattern.$suppressionEnabled = 1;
        $pattern.$writableStackTrace = 1;
        $pattern.$message = $rt_s(47);
        $rt_throw($pattern);
    }
    jur_AbstractSet_counter = 1;
    var$3 = new jur_Pattern;
    var$3.$backRefs = $rt_createArray(jur_FSet, 10);
    var$3.$globalGroupIndex = (-1);
    var$3.$compCount = (-1);
    var$3.$consCount = (-1);
    return jur_Pattern_compileImpl(var$3, $pattern, $flags);
}
function jur_Pattern_compileImpl($this, $pattern, $flags) {
    var var$3, var$4, var$5;
    $this.$lexemes = jur_Lexer__init_($pattern, $flags);
    $this.$flags = $flags;
    $pattern = jur_Pattern_processExpression($this, (-1), $flags, null);
    $this.$start2 = $pattern;
    var$3 = $this.$lexemes;
    if (!var$3.$ch && !var$3.$lookAhead && var$3.$index == var$3.$patternFullLength && !(var$3.$curST === null ? 0 : 1) ? 1 : 0) {
        if ($this.$needsBackRefReplacement)
            $pattern.$processSecondPass();
        return $this;
    }
    $pattern = new jur_PatternSyntaxException;
    var$4 = var$3.$orig;
    var$5 = var$3.$curToc;
    $pattern.$suppressionEnabled = 1;
    $pattern.$writableStackTrace = 1;
    $pattern.$index0 = (-1);
    $pattern.$desc = $rt_s(47);
    $pattern.$pattern = var$4;
    $pattern.$index0 = var$5;
    $rt_throw($pattern);
}
function jur_Pattern_processAlternations($this, $last) {
    var $auxRange, var$3, var$4, var$5, $rangeSet, var$7;
    $auxRange = new jur_CharClass;
    var$3 = $this.$flags;
    var$4 = (var$3 & 2) != 2 ? 0 : 1;
    var$5 = (var$3 & 64) != 64 ? 0 : 1;
    $rangeSet = new ju_BitSet;
    $rangeSet.$data0 = $rt_createIntArray(64);
    $auxRange.$lowHighSurrogates = $rangeSet;
    $rangeSet = new ju_BitSet;
    $rangeSet.$data0 = $rt_createIntArray(0);
    $auxRange.$bits = $rangeSet;
    $auxRange.$ci = var$4;
    $auxRange.$uci = var$5;
    while (true) {
        var$7 = $this.$lexemes;
        var$3 = var$7.$ch;
        if (!var$3 && !var$7.$lookAhead && var$7.$index == var$7.$patternFullLength && !(var$7.$curST === null ? 0 : 1) ? 1 : 0)
            break;
        var$5 = !var$3 && !var$7.$lookAhead && var$7.$index == var$7.$patternFullLength && !(var$7.$curST === null ? 0 : 1) ? 1 : 0;
        if (!(!var$5 && !(var$7.$curST === null ? 0 : 1) && (var$3 < 0 ? 0 : 1) ? 1 : 0))
            break;
        var$5 = var$7.$lookAhead;
        if (var$5 && var$5 != (-536870788) && var$5 != (-536870871))
            break;
        jur_Lexer_movePointer(var$7);
        jur_CharClass_add($auxRange, var$7.$lookBack);
        $rangeSet = $this.$lexemes;
        if ($rangeSet.$ch != (-536870788))
            continue;
        jur_Lexer_movePointer($rangeSet);
    }
    $rangeSet = jur_Pattern_processRangeSet($this, $auxRange);
    $rangeSet.$setNext($last);
    return $rangeSet;
}
function jur_Pattern_processExpression($this, $ch, $newFlags, $last) {
    var $children, $saveFlags, $saveChangedFlags, $fSet, var$8, var$9, var$10, $child;
    $children = new ju_ArrayList;
    $children.$array = $rt_createArray(jl_Object, 10);
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $saveFlags)
        $this.$flags = $newFlags;
    a: {
        switch ($ch) {
            case -1073741784:
                $fSet = new jur_NonCapFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet_$callClinit();
                var$8 = jur_AbstractSet_counter;
                jur_AbstractSet_counter = var$8 + 1 | 0;
                $last = new jl_AbstractStringBuilder;
                $last.$buffer = $rt_createCharArray(20);
                $fSet.$index1 = (jl_AbstractStringBuilder_insert0($last, $last.$length, var$8, 10)).$toString();
                $fSet.$groupIndex = $newFlags;
                break a;
            case -536870872:
            case -268435416:
                $fSet = new jur_AheadFSet;
                jur_FSet_$callClinit();
                var$8 = jur_AbstractSet_counter;
                jur_AbstractSet_counter = var$8 + 1 | 0;
                $last = new jl_AbstractStringBuilder;
                $last.$buffer = $rt_createCharArray(20);
                $fSet.$index1 = (jl_AbstractStringBuilder_insert0($last, $last.$length, var$8, 10)).$toString();
                $fSet.$groupIndex = (-1);
                break a;
            case -134217688:
            case -67108824:
                $fSet = new jur_BehindFSet;
                var$9 = $this.$consCount + 1 | 0;
                $this.$consCount = var$9;
                jur_FSet_$callClinit();
                $newFlags = jur_AbstractSet_counter;
                jur_AbstractSet_counter = $newFlags + 1 | 0;
                $last = new jl_AbstractStringBuilder;
                $last.$buffer = $rt_createCharArray(20);
                $fSet.$index1 = (jl_AbstractStringBuilder_insert0($last, $last.$length, $newFlags, 10)).$toString();
                $fSet.$groupIndex = var$9;
                break a;
            case -33554392:
                break;
            default:
                $newFlags = $this.$globalGroupIndex + 1 | 0;
                $this.$globalGroupIndex = $newFlags;
                if ($last !== null) {
                    $fSet = new jur_FSet;
                    jur_FSet_$callClinit();
                    jur_AbstractSet__init_($fSet);
                    $fSet.$groupIndex = $newFlags;
                } else {
                    $fSet = new jur_FinalSet;
                    jur_FSet__init_($fSet, 0);
                    $saveChangedFlags = 1;
                }
                var$8 = $this.$globalGroupIndex;
                if (var$8 <= (-1))
                    break a;
                if (var$8 >= 10)
                    break a;
                $this.$backRefs.data[var$8] = $fSet;
                break a;
        }
        $fSet = new jur_AtomicFSet;
        var$10 = $this.$consCount + 1 | 0;
        $this.$consCount = var$10;
        jur_FSet_$callClinit();
        $newFlags = jur_AbstractSet_counter;
        jur_AbstractSet_counter = $newFlags + 1 | 0;
        $fSet.$index1 = jl_Integer_toString($newFlags, 10);
        $fSet.$groupIndex = var$10;
    }
    while (true) {
        if (jur_Lexer_isLetter($this.$lexemes) && $this.$lexemes.$lookAhead == (-536870788))
            $child = jur_Pattern_processAlternations($this, $fSet);
        else if ($this.$lexemes.$ch == (-536870788)) {
            $child = jur_EmptySet__init_($fSet);
            jur_Lexer_next($this.$lexemes);
        } else {
            $child = jur_Pattern_processSubExpression($this, $fSet);
            if (jur_Lexer_peek($this.$lexemes) == (-536870788))
                jur_Lexer_next($this.$lexemes);
        }
        if ($child !== null)
            ju_ArrayList_add($children, $child);
        if (jur_Lexer_isEmpty($this.$lexemes))
            break;
        if (jur_Lexer_peek($this.$lexemes) == (-536870871))
            break;
    }
    if (jur_Lexer_back($this.$lexemes) == (-536870788))
        ju_ArrayList_add($children, jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        jur_Lexer_restoreFlags($this.$lexemes, $saveFlags);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            return jur_PositiveLookAhead__init_($children, $fSet);
        case -268435416:
            return jur_NegativeLookAhead__init_($children, $fSet);
        case -134217688:
            return jur_PositiveLookBehind__init_($children, $fSet);
        case -67108824:
            return jur_NegativeLookBehind__init_($children, $fSet);
        case -33554392:
            return jur_AtomicJointSet__init_($children, $fSet);
        default:
            switch (ju_ArrayList_size($children)) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_(ju_ArrayList_get($children, 0), $fSet);
                default:
                    return jur_JointSet__init_($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    return jur_NonCapJointSet__init_($children, $fSet);
}
function jur_Pattern_processSequence($this) {
    var $substring, var$2, var$3, var$4, var$5, $ch, var$7, var$8, var$9, var$10;
    $substring = new jl_StringBuffer;
    $substring.$buffer = $rt_createCharArray(16);
    while (true) {
        var$2 = $this.$lexemes;
        var$3 = var$2.$ch;
        if (!var$3 && !var$2.$lookAhead && var$2.$index == var$2.$patternFullLength && !(var$2.$curST === null ? 0 : 1) ? 1 : 0)
            break;
        var$4 = !var$3 && !var$2.$lookAhead && var$2.$index == var$2.$patternFullLength && !(var$2.$curST === null ? 0 : 1) ? 1 : 0;
        if (!(!var$4 && !(var$2.$curST === null ? 0 : 1) && (var$3 < 0 ? 0 : 1) ? 1 : 0))
            break;
        if (var$3 <= 56319 && var$3 >= 55296 ? 1 : 0)
            break;
        if (var$3 <= 57343 && var$3 >= 56320 ? 1 : 0)
            break;
        var$5 = var$2.$lookAheadST;
        var$4 = var$5 === null ? 0 : 1;
        if (!(!var$4 && !var$2.$lookAhead)) {
            var$4 = var$5 === null ? 0 : 1;
            if (!(!var$4 && (var$2.$lookAhead < 0 ? 0 : 1))) {
                var$3 = var$2.$lookAhead;
                if (var$3 != (-536870871) && (var$3 & (-2147418113)) != (-2147483608) && var$3 != (-536870788) && var$3 != (-536870876))
                    break;
            }
        }
        jur_Lexer_movePointer(var$2);
        $ch = var$2.$lookBack;
        var$4 = $rt_compare($ch, 65536);
        if (!(var$4 >= 0 && $ch <= 1114111 ? 1 : 0)) {
            var$4 = $ch & 65535;
            var$7 = $substring.$length;
            jl_AbstractStringBuilder_insertSpace($substring, var$7, var$7 + 1 | 0);
            $substring.$buffer.data[var$7] = var$4;
        } else {
            if (var$4 < 0) {
                var$8 = $rt_createCharArray(1);
                var$8.data[0] = $ch & 65535;
            } else
                var$8 = $rt_createCharArrayFromData([(55296 | ($ch - 65536 | 0) >> 10 & 1023) & 65535, (56320 | $ch & 1023) & 65535]);
            var$8 = var$8.data;
            var$4 = 0;
            var$7 = var$8.length;
            var$3 = $substring.$length;
            jl_AbstractStringBuilder_insertSpace($substring, var$3, var$3 + var$7 | 0);
            var$9 = var$7 + var$4 | 0;
            while (var$4 < var$9) {
                var$10 = $substring.$buffer.data;
                $ch = var$3 + 1 | 0;
                var$7 = var$4 + 1 | 0;
                var$10[var$3] = var$8[var$4];
                var$3 = $ch;
                var$4 = var$7;
            }
        }
    }
    var$7 = $this.$flags;
    if (!((var$7 & 2) != 2 ? 0 : 1))
        return jur_SequenceSet__init_($substring);
    if (!((var$7 & 64) != 64 ? 0 : 1))
        return jur_CISequenceSet__init_($substring);
    var$2 = new jur_UCISequenceSet;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$2.$index1 = jl_Integer_toString0(var$4);
    var$2.$charCount = 1;
    var$5 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0(var$5);
    var$4 = 0;
    while (var$4 < jl_StringBuffer_length($substring)) {
        jl_StringBuilder_append(var$5, jl_Character_toLowerCase(jl_Character_toUpperCase(jl_StringBuffer_charAt($substring, var$4))));
        var$4 = var$4 + 1 | 0;
    }
    var$2.$string = jl_StringBuilder_toString(var$5);
    var$2.$charCount = jl_StringBuilder_length(var$5);
    return var$2;
}
function jur_Pattern_processDecomposedChar($this) {
    var $codePoints, $curSymb, $curSymbIndex, var$4, var$5, var$6, $codePointsHangul, $readCodePoints, var$9;
    $codePoints = $rt_createIntArray(4);
    $curSymb = (-1);
    $curSymbIndex = (-1);
    var$4 = $this.$lexemes;
    var$5 = var$4.$ch;
    if (!(!var$5 && !var$4.$lookAhead && var$4.$index == var$4.$patternFullLength && !(var$4.$curST === null ? 0 : 1) ? 1 : 0)) {
        var$6 = !var$5 && !var$4.$lookAhead && var$4.$index == var$4.$patternFullLength && !(var$4.$curST === null ? 0 : 1) ? 1 : 0;
        if (!var$6 && !(var$4.$curST === null ? 0 : 1) && (var$5 < 0 ? 0 : 1) ? 1 : 0) {
            $codePointsHangul = $codePoints.data;
            jur_Lexer_movePointer(var$4);
            $curSymb = var$4.$lookBack;
            $codePointsHangul[0] = $curSymb;
            $curSymbIndex = $curSymb - 4352 | 0;
        }
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        $codePoints = $codePointsHangul.data;
        $codePoints[0] = $curSymb & 65535;
        var$4 = $this.$lexemes;
        $readCodePoints = var$4.$ch;
        $curSymb = $readCodePoints - 4449 | 0;
        if ($curSymb >= 0 && $curSymb < 21) {
            $codePoints[1] = $readCodePoints & 65535;
            jur_Lexer_movePointer(var$4);
            var$4 = $this.$lexemes;
            $readCodePoints = var$4.$ch;
            $curSymbIndex = $readCodePoints - 4519 | 0;
            if ($curSymbIndex >= 0 && $curSymbIndex < 28) {
                $codePoints[2] = $readCodePoints & 65535;
                jur_Lexer_movePointer(var$4);
                var$4 = new jur_HangulDecomposedCharSet;
                $curSymb = jur_AbstractSet_counter;
                jur_AbstractSet_counter = $curSymb + 1 | 0;
                var$9 = new jl_AbstractStringBuilder;
                var$9.$buffer = $rt_createCharArray(20);
                var$4.$index1 = (jl_AbstractStringBuilder_insert0(var$9, var$9.$length, $curSymb, 10)).$toString();
                var$4.$decomposedChar = $codePointsHangul;
                var$4.$decomposedCharLength = 3;
                return var$4;
            }
            var$9 = new jur_HangulDecomposedCharSet;
            $readCodePoints = jur_AbstractSet_counter;
            jur_AbstractSet_counter = $readCodePoints + 1 | 0;
            var$4 = new jl_AbstractStringBuilder;
            var$4.$buffer = $rt_createCharArray(20);
            var$9.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, $readCodePoints, 10)).$toString();
            var$9.$decomposedChar = $codePointsHangul;
            var$9.$decomposedCharLength = 2;
            return var$9;
        }
        $curSymb = $this.$flags;
        if (!(($curSymb & 2) != 2 ? 0 : 1)) {
            var$4 = new jur_CharSet;
            $readCodePoints = $codePoints[0];
            jur_LeafSet__init_(var$4);
            var$4.$ch0 = $readCodePoints;
            return var$4;
        }
        if (($curSymb & 64) != 64 ? 0 : 1)
            return jur_UCICharSet__init_($codePoints[0]);
        return jur_CICharSet__init_($codePoints[0]);
    }
    $codePointsHangul = $codePoints.data;
    $curSymb = 1;
    while ($curSymb < 4 && !jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $readCodePoints = $curSymb + 1 | 0;
        $codePointsHangul[$curSymb] = jur_Lexer_next($this.$lexemes);
        $curSymb = $readCodePoints;
    }
    if ($curSymb == 1 && !jur_Lexer_hasSingleCodepointDecomposition($codePointsHangul[0]))
        return jur_Pattern_processCharSet($this, $codePointsHangul[0]);
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_DecomposedCharSet__init_($codePoints, $curSymb);
    if (jur_Pattern_hasFlag($this, 64))
        return jur_UCIDecomposedCharSet__init_($codePoints, $curSymb);
    return jur_CIDecomposedCharSet__init_($codePoints, $curSymb);
}
function jur_Pattern_processSubExpression($this, $last) {
    var $term, var$3, var$4, $cur, $next, var$7;
    $term = $this.$lexemes;
    var$3 = $term.$ch;
    var$4 = !var$3 && !$term.$lookAhead && $term.$index == $term.$patternFullLength && !($term.$curST === null ? 0 : 1) ? 1 : 0;
    var$4 = !var$4 && !($term.$curST === null ? 0 : 1) && (var$3 < 0 ? 0 : 1) ? 1 : 0;
    if (var$4 && !($term.$lookAheadST === null ? 0 : 1) && ($term.$lookAhead < 0 ? 0 : 1)) {
        if (!(($this.$flags & 128) != 128 ? 0 : 1)) {
            var$4 = var$3 <= 56319 && var$3 >= 55296 ? 1 : 0;
            $cur = !var$4 && !jur_Lexer_isLowSurrogate($term) ? jur_Pattern_processSequence($this) : jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
        } else {
            $cur = jur_Pattern_processDecomposedChar($this);
            $next = $this.$lexemes;
            var$3 = $next.$ch;
            if (!(!var$3 && !$next.$lookAhead && $next.$index == $next.$patternFullLength && !($next.$curST === null ? 0 : 1) ? 1 : 0) && !(var$3 == (-536870871) && !($last instanceof jur_FinalSet)) && var$3 != (-536870788)) {
                var$4 = !var$3 && !$next.$lookAhead && $next.$index == $next.$patternFullLength && !($next.$curST === null ? 0 : 1) ? 1 : 0;
                if (!(!var$4 && !($next.$curST === null ? 0 : 1) && (var$3 < 0 ? 0 : 1) ? 1 : 0))
                    $cur = jur_Pattern_processQuantifier($this, $last, $cur);
            }
        }
    } else if (var$3 != (-536870871))
        $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
    else {
        if ($last instanceof jur_FinalSet)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($term), jur_Lexer_getIndex($this.$lexemes)));
        $cur = new jur_EmptySet;
        jur_LeafSet__init_0($cur, $last);
        $cur.$charCount = 0;
    }
    $term = $this.$lexemes;
    var$4 = $term.$ch;
    var$7 = !var$4 && !$term.$lookAhead && $term.$index == $term.$patternFullLength && !($term.$curST === null ? 0 : 1) ? 1 : 0;
    if (!var$7 && !(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788)) {
        $next = jur_Pattern_processSubExpression($this, $last);
        if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
            $term = $cur;
            if (!$next.$first($term.$innerSet))
                $cur = jur_UnifiedQuantifierSet__init_($term);
        }
        if (($next.$getType0() & 65535) != 43)
            $cur.$setNext($next);
        else
            $cur.$setNext($next.$innerSet);
    } else {
        if ($cur === null)
            return null;
        $cur.$setNext($last);
    }
    if (($cur.$getType0() & 65535) != 43)
        return $cur;
    return $cur.$innerSet;
}
function jur_Pattern_processQuantifier($this, $last, $term) {
    var $q, $quant, var$5, $leaf, $q_0;
    $q = $this.$lexemes;
    $quant = $q.$ch;
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                jur_Lexer_movePointer($q);
                $q = new jur_PossessiveGroupQuantifierSet;
                var$5 = jur_AbstractSet_counter;
                jur_AbstractSet_counter = var$5 + 1 | 0;
                $leaf = new jl_AbstractStringBuilder;
                jl_Object__init_0($leaf);
                $leaf.$buffer = $rt_createCharArray(20);
                $q.$index1 = (jl_AbstractStringBuilder_insert0($leaf, $leaf.$length, var$5, 10)).$toString();
                $q.$next0 = $last;
                $q.$innerSet = $term;
                $q.$type = $quant;
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483605:
                jur_Lexer_movePointer($q);
                $q = new jur_PosPlusGroupQuantifierSet;
                $quant = jur_AbstractSet_counter;
                jur_AbstractSet_counter = $quant + 1 | 0;
                $leaf = new jl_AbstractStringBuilder;
                jl_Object__init_0($leaf);
                $leaf.$buffer = $rt_createCharArray(20);
                $q.$index1 = (jl_AbstractStringBuilder_insert0($leaf, $leaf.$length, $quant, 10)).$toString();
                $q.$next0 = $last;
                $q.$innerSet = $term;
                $q.$type = (-2147483606);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483585:
                jur_Lexer_movePointer($q);
                $q = new jur_PosAltGroupQuantifierSet;
                $quant = jur_AbstractSet_counter;
                jur_AbstractSet_counter = $quant + 1 | 0;
                $q.$index1 = (jl_AbstractStringBuilder_append0(jl_AbstractStringBuilder__init_1(20), $quant, 10)).$toString();
                $q.$next0 = $last;
                $q.$innerSet = $term;
                $q.$type = (-536870849);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483525:
                $leaf = new jur_PosCompositeGroupQuantifierSet;
                $q_0 = $q.$curST;
                jur_Lexer_movePointer($q);
                $q = $q_0;
                var$5 = $this.$compCount + 1 | 0;
                $this.$compCount = var$5;
                jur_AbstractSet__init_0($leaf, $last);
                $leaf.$innerSet = $term;
                $leaf.$type = (-536870849);
                $leaf.$quantifier = $q;
                $leaf.$setCounter = var$5;
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $leaf;
            case -1073741782:
            case -1073741781:
                jur_Lexer_next($q);
                $q = jur_ReluctantGroupQuantifierSet__init_($term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                jur_Lexer_next($q);
                $q = jur_RelAltGroupQuantifierSet__init_($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q_0 = new jur_RelCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_RelCompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            case -536870870:
            case -536870869:
                jur_Lexer_next($q);
                $q = $term.$getType0() != (-2147483602) ? jur_GroupQuantifierSet__init_($term, $last, $quant) : jur_Pattern_hasFlag($this, 32) ? jur_DotAllQuantifierSet__init_($term, $last, $quant) : jur_DotQuantifierSet__init_($term, $last, $quant, jur_AbstractLineTerminator_getInstance($this.$flags));
                $term.$setNext($q);
                return $q;
            case -536870849:
                jur_Lexer_next($q);
                $q = jur_AltGroupQuantifierSet__init_($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q_0 = new jur_CompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            jur_Lexer_next($q);
            $q = jur_PossessiveQuantifierSet__init_($leaf, $last, $quant);
            jur_AbstractSet_setNext($leaf, $q);
            return $q;
        case -2147483585:
            jur_Lexer_next($q);
            return jur_PossessiveAltQuantifierSet__init_($leaf, $last, (-2147483585));
        case -2147483525:
            return jur_PossessiveCompositeQuantifierSet__init_(jur_Lexer_nextSpecial($q), $leaf, $last, (-2147483525));
        case -1073741782:
        case -1073741781:
            jur_Lexer_next($q);
            $q = jur_ReluctantQuantifierSet__init_($leaf, $last, $quant);
            jur_AbstractSet_setNext($leaf, $q);
            return $q;
        case -1073741761:
            jur_Lexer_next($q);
            return jur_ReluctantAltQuantifierSet__init_($leaf, $last, (-1073741761));
        case -1073741701:
            return jur_ReluctantCompositeQuantifierSet__init_(jur_Lexer_nextSpecial($q), $leaf, $last, (-1073741701));
        case -536870870:
        case -536870869:
            jur_Lexer_next($q);
            $q = jur_LeafQuantifierSet__init_($leaf, $last, $quant);
            jur_AbstractSet_setNext($leaf, $q);
            return $q;
        case -536870849:
            jur_Lexer_next($q);
            return jur_AltQuantifierSet__init_($leaf, $last, (-536870849));
        case -536870789:
            return jur_CompositeQuantifierSet__init_(jur_Lexer_nextSpecial($q), $leaf, $last, (-536870789));
        default:
    }
    return $term;
}
function jur_Pattern_processTerminal($this, $last) {
    var $term, var$3, $cc, $ch, $newFlags, var$7, $negative, $number;
    $term = null;
    var$3 = $last instanceof jur_FinalSet;
    while (true) {
        a: {
            $cc = $this.$lexemes;
            $ch = $cc.$ch;
            if (($ch & (-2147418113)) == (-2147483608)) {
                jur_Lexer_movePointer($cc);
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    $cc = $this.$lexemes;
                    if ($cc.$ch != (-536870871)) {
                        $last = new jur_PatternSyntaxException;
                        var$7 = $cc.$orig;
                        $negative = $cc.$curToc;
                        $last.$suppressionEnabled = 1;
                        $last.$writableStackTrace = 1;
                        $last.$index0 = (-1);
                        $last.$desc = $rt_s(47);
                        $last.$pattern = var$7;
                        $last.$index0 = $negative;
                        $rt_throw($last);
                    }
                    jur_Lexer_movePointer($cc);
                }
            } else {
                b: {
                    c: {
                        switch ($ch) {
                            case -2147483599:
                            case -2147483598:
                            case -2147483597:
                            case -2147483596:
                            case -2147483595:
                            case -2147483594:
                            case -2147483593:
                            case -2147483592:
                            case -2147483591:
                                break c;
                            case -2147483583:
                                jur_Lexer_next($cc);
                                $term = new jur_SOLSet;
                                jur_AbstractSet__init_($term);
                                break a;
                            case -2147483582:
                                jur_Lexer_next($cc);
                                $term = jur_WordBoundary__init_(0);
                                break a;
                            case -2147483577:
                                break;
                            case -2147483558:
                                jur_Lexer_next($cc);
                                $term = new jur_EOLSet;
                                $number = $this.$consCount + 1 | 0;
                                $this.$consCount = $number;
                                jur_EOLSet__init_($term, $number);
                                break a;
                            case -2147483550:
                                jur_Lexer_next($cc);
                                $term = jur_WordBoundary__init_(1);
                                break a;
                            case -2147483526:
                                jur_Lexer_next($cc);
                                $term = jur_EOISet__init_();
                                break a;
                            case -536870876:
                                jur_Lexer_next($cc);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (jur_Pattern_hasFlag($this, 8)) {
                                    if (jur_Pattern_hasFlag($this, 1)) {
                                        $term = jur_UMultiLineEOLSet__init_($this.$consCount);
                                        break a;
                                    }
                                    $term = jur_MultiLineEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                $term = jur_EOLSet__init_0($this.$consCount);
                                break a;
                            case -536870866:
                                jur_Lexer_next($cc);
                                if (jur_Pattern_hasFlag($this, 32)) {
                                    $term = jur_DotAllSet__init_();
                                    break a;
                                }
                                $term = jur_DotSet__init_(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case -536870821:
                                jur_Lexer_next($cc);
                                $negative = 0;
                                if (jur_Lexer_peek($this.$lexemes) == (-536870818)) {
                                    $negative = 1;
                                    jur_Lexer_next($this.$lexemes);
                                }
                                $term = jur_Pattern_processRange($this, $negative, $last);
                                if (jur_Lexer_peek($this.$lexemes) != (-536870819))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this.$lexemes), jur_Lexer_getIndex($this.$lexemes)));
                                jur_Lexer_setMode($this.$lexemes, 1);
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            case -536870818:
                                jur_Lexer_next($cc);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (!jur_Pattern_hasFlag($this, 8)) {
                                    $term = jur_SOLSet__init_();
                                    break a;
                                }
                                $term = jur_MultiLineSOLSet__init_(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case 0:
                                $cc = jur_Lexer_peekSpecial($cc);
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if (jur_Lexer_isEmpty($this.$lexemes)) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            default:
                                break b;
                        }
                        jur_Lexer_next($cc);
                        $term = jur_PreviousMatch__init_();
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($cc), jur_Lexer_getIndex($this.$lexemes)));
                    jur_Lexer_next($cc);
                    $this.$consCount = $this.$consCount + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_($number, $this.$consCount) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_($number, $this.$consCount) : jur_CIBackReferenceSet__init_($number, $this.$consCount);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !jur_Lexer_isSpecial($cc)) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    jur_Lexer_next($this.$lexemes);
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_(!jur_Lexer_isSpecial($this.$lexemes) ? jl_Character_toString($ch & 65535) : (jur_Lexer_peekSpecial($this.$lexemes)).$toString(), jur_Lexer_toString($this.$lexemes), jur_Lexer_getIndex($this.$lexemes)));
                    if (var$3)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this.$lexemes), jur_Lexer_getIndex($this.$lexemes)));
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
}
function jur_Pattern_processRange($this, $negative, $last) {
    var $rangeSet;
    $rangeSet = jur_Pattern_processRangeSet($this, jur_Pattern_processRangeExpression($this, $negative));
    $rangeSet.$setNext($last);
    return $rangeSet;
}
function jur_Pattern_processRangeExpression($this, $alt) {
    var $res, $cur, $negative, $cs, $buffer, $intersection, $notClosed, $firstInClass, var$10, var$11, $$je;
    $res = new jur_CharClass;
    $cur = $this.$flags;
    $negative = ($cur & 2) != 2 ? 0 : 1;
    $cur = ($cur & 64) != 64 ? 0 : 1;
    $cs = new ju_BitSet;
    $cs.$data0 = $rt_createIntArray(64);
    $res.$lowHighSurrogates = $cs;
    $cs = new ju_BitSet;
    $cs.$data0 = $rt_createIntArray(0);
    $res.$bits = $cs;
    $res.$ci = $negative;
    $res.$uci = $cur;
    jur_AbstractCharClass_setNegative($res, $alt);
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: while (true) {
                var$10 = $this.$lexemes;
                $alt = var$10.$ch;
                if (!$alt && !var$10.$lookAhead && var$10.$index == var$10.$patternFullLength && !(var$10.$curST === null ? 0 : 1) ? 1 : 0)
                    break a;
                $notClosed = $alt == (-536870819) && !$firstInClass ? 0 : 1;
                if (!$notClosed)
                    break a;
                d: {
                    switch ($alt) {
                        case -536870874:
                            if ($buffer >= 0)
                                jur_CharClass_add($res, $buffer);
                            $buffer = jur_Lexer_next($this.$lexemes);
                            if (jur_Lexer_peek($this.$lexemes) != (-536870874)) {
                                $buffer = 38;
                                break d;
                            }
                            if (jur_Lexer_lookAhead($this.$lexemes) == (-536870821)) {
                                jur_Lexer_next($this.$lexemes);
                                $intersection = 1;
                                $buffer = (-1);
                                break d;
                            }
                            jur_Lexer_next($this.$lexemes);
                            if ($firstInClass) {
                                $res = jur_Pattern_processRangeExpression($this, 0);
                                break d;
                            }
                            if (jur_Lexer_peek($this.$lexemes) == (-536870819))
                                break d;
                            jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, 0));
                            break d;
                        case -536870867:
                            if (!$firstInClass && jur_Lexer_lookAhead(var$10) != (-536870819) && jur_Lexer_lookAhead($this.$lexemes) != (-536870821) && $buffer >= 0) {
                                jur_Lexer_next($this.$lexemes);
                                $cur = jur_Lexer_peek($this.$lexemes);
                                if (jur_Lexer_isSpecial($this.$lexemes))
                                    break c;
                                if ($cur < 0 && jur_Lexer_lookAhead($this.$lexemes) != (-536870819) && jur_Lexer_lookAhead($this.$lexemes) != (-536870821) && $buffer >= 0)
                                    break c;
                                e: {
                                    try {
                                        if (jur_Lexer_isLetter0($cur))
                                            break e;
                                        $cur = $cur & 65535;
                                        break e;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Exception) {
                                            break b;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                                try {
                                    jur_CharClass_add0($res, $buffer, $cur);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Exception) {
                                        break b;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                jur_Lexer_next($this.$lexemes);
                                $buffer = (-1);
                                break d;
                            }
                            if ($buffer >= 0)
                                jur_CharClass_add($res, $buffer);
                            $buffer = 45;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870821:
                            if ($buffer >= 0) {
                                jur_CharClass_add($res, $buffer);
                                $buffer = (-1);
                            }
                            jur_Lexer_movePointer($this.$lexemes);
                            $negative = 0;
                            $cs = $this.$lexemes;
                            if ($cs.$ch == (-536870818)) {
                                jur_Lexer_movePointer($cs);
                                $negative = 1;
                            }
                            if (!$intersection)
                                jur_CharClass_union($res, jur_Pattern_processRangeExpression($this, $negative));
                            else
                                jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870819:
                            break;
                        case -536870818:
                            if ($buffer >= 0)
                                jur_CharClass_add($res, $buffer);
                            $buffer = 94;
                            jur_Lexer_movePointer($this.$lexemes);
                            break d;
                        case 0:
                            if ($buffer >= 0)
                                jur_CharClass_add($res, $buffer);
                            $cs = $this.$lexemes.$curST;
                            if ($cs === null)
                                $buffer = 0;
                            else {
                                jur_CharClass_add1($res, $cs);
                                $buffer = (-1);
                            }
                            jur_Lexer_movePointer($this.$lexemes);
                            break d;
                        default:
                            if ($buffer >= 0)
                                jur_CharClass_add($res, $buffer);
                            $cs = $this.$lexemes;
                            jur_Lexer_movePointer($cs);
                            $buffer = $cs.$lookBack;
                            break d;
                    }
                    if ($buffer >= 0)
                        jur_CharClass_add($res, $buffer);
                    $buffer = 93;
                    jur_Lexer_movePointer($this.$lexemes);
                }
                $firstInClass = 0;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Pattern_pattern($this), jur_Lexer_getIndex($this.$lexemes)));
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Pattern_pattern($this), jur_Lexer_getIndex($this.$lexemes)));
    }
    if (!$notClosed) {
        if ($buffer >= 0)
            jur_CharClass_add($res, $buffer);
        return $res;
    }
    $res = new jur_PatternSyntaxException;
    var$11 = var$10.$orig;
    $alt = var$10.$curToc - 1 | 0;
    $res.$suppressionEnabled = 1;
    $res.$writableStackTrace = 1;
    $res.$index0 = (-1);
    $res.$desc = $rt_s(47);
    $res.$pattern = var$11;
    $res.$index0 = $alt;
    $rt_throw($res);
}
function jur_Pattern_processCharSet($this, $ch) {
    var $isSupplCodePoint, var$3, var$4, var$5, var$6;
    $isSupplCodePoint = $ch >= 65536 && $ch <= 1114111 ? 1 : 0;
    var$3 = $this.$flags;
    if ((var$3 & 2) != 2 ? 0 : 1) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            var$4 = new jur_CICharSet;
            $ch = $ch & 65535;
            var$5 = jur_AbstractSet_counter;
            jur_AbstractSet_counter = var$5 + 1 | 0;
            var$6 = new jl_AbstractStringBuilder;
            var$6.$buffer = $rt_createCharArray(20);
            var$4.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
            var$4.$charCount = 1;
            var$4.$ch1 = $ch;
            var$4.$supplement = jur_Pattern_getSupplement($ch);
            return var$4;
        }
        if (((var$3 & 64) != 64 ? 0 : 1) && $ch > 128) {
            if ($isSupplCodePoint) {
                var$4 = new jur_UCISupplCharSet;
                var$5 = jur_AbstractSet_counter;
                jur_AbstractSet_counter = var$5 + 1 | 0;
                var$6 = new jl_AbstractStringBuilder;
                var$6.$buffer = $rt_createCharArray(20);
                var$4.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
                var$4.$charCount = 1;
                var$4.$charCount = 2;
                var$4.$ch2 = (String.fromCharCode((String.fromCharCode($ch)).toUpperCase().charCodeAt(0))).toLowerCase().charCodeAt(0);
                return var$4;
            }
            if ($ch <= 57343 && $ch >= 56320 ? 1 : 0) {
                var$4 = new jur_LowSurrogateCharSet;
                $ch = $ch & 65535;
                var$5 = jur_AbstractSet_counter;
                jur_AbstractSet_counter = var$5 + 1 | 0;
                var$6 = new jl_AbstractStringBuilder;
                var$6.$buffer = $rt_createCharArray(20);
                var$4.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
                var$4.$low = $ch;
                return var$4;
            }
            if ($ch <= 56319 && $ch >= 55296 ? 1 : 0)
                return jur_HighSurrogateCharSet__init_($ch & 65535);
            var$4 = new jur_UCICharSet;
            $ch = $ch & 65535;
            var$5 = jur_AbstractSet_counter;
            jur_AbstractSet_counter = var$5 + 1 | 0;
            var$4.$index1 = jl_Integer_toString(var$5, 10);
            var$4.$charCount = 1;
            var$4.$ch3 = jl_Character_toLowerCase((otp_Platform_stringFromCharCode($ch)).toUpperCase().charCodeAt(0) & 65535);
            return var$4;
        }
    }
    if ($isSupplCodePoint)
        return jur_SupplCharSet__init_($ch);
    if (jur_Lexer_isLowSurrogate0($ch))
        return jur_LowSurrogateCharSet__init_($ch & 65535);
    if (!jur_Lexer_isHighSurrogate($ch))
        return jur_CharSet__init_($ch & 65535);
    return jur_HighSurrogateCharSet__init_($ch & 65535);
}
function jur_Pattern_processRangeSet($this, $charClass) {
    var $surrogates, $lowHighSurrRangeSet, var$4, var$5, var$6, var$7;
    if (!jur_AbstractCharClass_hasLowHighSurrogates($charClass)) {
        if (!$charClass.$mayContainSupplCodepoints) {
            if ($charClass.$hasUCI())
                return jur_UCIRangeSet__init_($charClass);
            return jur_RangeSet__init_($charClass);
        }
        if (!$charClass.$hasUCI())
            return jur_SupplRangeSet__init_($charClass);
        $surrogates = new jur_UCISupplRangeSet;
        jur_SupplRangeSet__init_0($surrogates, $charClass);
        return $surrogates;
    }
    $surrogates = jur_AbstractCharClass_getSurrogates($charClass);
    $lowHighSurrRangeSet = new jur_LowHighSurrogateRangeSet;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $lowHighSurrRangeSet.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $lowHighSurrRangeSet.$surrChars = $surrogates;
    $lowHighSurrRangeSet.$alt = $surrogates.$alt0;
    if (!$charClass.$mayContainSupplCodepoints) {
        if (!$charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_RangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
        $surrogates = new jur_CompositeRangeSet;
        var$5 = new jur_UCIRangeSet;
        $charClass = jur_AbstractCharClass_getWithoutSurrogates($charClass);
        var$4 = jur_AbstractSet_counter;
        jur_AbstractSet_counter = var$4 + 1 | 0;
        var$6 = new jl_AbstractStringBuilder;
        var$6.$buffer = $rt_createCharArray(20);
        var$5.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$4, 10)).$toString();
        var$5.$charCount = 1;
        var$5.$chars = $charClass;
        var$5.$alt1 = $charClass.$alt0;
        jur_CompositeRangeSet__init_0($surrogates, var$5, $lowHighSurrRangeSet);
        return $surrogates;
    }
    if (!$charClass.$hasUCI()) {
        $surrogates = new jur_CompositeRangeSet;
        var$5 = new jur_SupplRangeSet;
        var$6 = jur_AbstractCharClass_getWithoutSurrogates($charClass);
        var$4 = jur_AbstractSet_counter;
        jur_AbstractSet_counter = var$4 + 1 | 0;
        $charClass = new jl_AbstractStringBuilder;
        $charClass.$buffer = $rt_createCharArray(20);
        var$5.$index1 = (jl_AbstractStringBuilder_insert0($charClass, $charClass.$length, var$4, 10)).$toString();
        var$5.$chars0 = var$6;
        var$5.$alt2 = var$6.$alt0;
        var$7 = jur_AbstractSet_counter;
        jur_AbstractSet_counter = var$7 + 1 | 0;
        $charClass = new jl_AbstractStringBuilder;
        $charClass.$buffer = $rt_createCharArray(20);
        $surrogates.$index1 = (jl_AbstractStringBuilder_insert0($charClass, $charClass.$length, var$7, 10)).$toString();
        $surrogates.$withoutSurrogates = var$5;
        $surrogates.$withSurrogates = $lowHighSurrRangeSet;
        return $surrogates;
    }
    $surrogates = new jur_CompositeRangeSet;
    var$5 = new jur_UCISupplRangeSet;
    $charClass = jur_AbstractCharClass_getWithoutSurrogates($charClass);
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$6 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$6);
    var$6.$buffer = $rt_createCharArray(20);
    var$5.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$4, 10)).$toString();
    var$5.$chars0 = $charClass;
    var$5.$alt2 = $charClass.$alt0;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    $charClass = new jl_AbstractStringBuilder;
    $charClass.$buffer = $rt_createCharArray(20);
    $surrogates.$index1 = (jl_AbstractStringBuilder_insert0($charClass, $charClass.$length, var$4, 10)).$toString();
    $surrogates.$withoutSurrogates = var$5;
    $surrogates.$withSurrogates = $lowHighSurrRangeSet;
    return $surrogates;
}
function jur_Pattern_getSupplement($ch) {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
}
function jur_Pattern_hasFlag($this, $flag) {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
}
var ju_Arrays = $rt_classWithoutFields();
var otji_IDBObjectStoreParameters = $rt_classWithoutFields();
function otji_IDBObjectStoreParameters_create$js_body$_1() {
    return {  };
}
function jnci_BufferedEncoder() {
    var a = this; jnc_CharsetEncoder.call(a);
    a.$inArray = null;
    a.$outArray = null;
}
function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
    var $inArray, $inPos, $inSize, $outArray, $outSize, var$8, $i, var$10, $outPos, $outSize_0, $result, $controller;
    $inArray = $this.$inArray;
    $inPos = 0;
    $inSize = 0;
    $outArray = $this.$outArray;
    a: {
        while (true) {
            if (($inPos + 32 | 0) > $inSize) {
                $outSize = $in.$position;
                var$8 = $in.$limit;
                if ($outSize >= var$8 ? 0 : 1) {
                    $i = $inPos;
                    while ($i < $inSize) {
                        var$10 = $inArray.data;
                        var$10[$i - $inPos | 0] = var$10[$i];
                        $i = $i + 1 | 0;
                    }
                    var$10 = $inArray.data;
                    $i = $inSize - $inPos | 0;
                    $outPos = (var$8 - $outSize | 0) + $i | 0;
                    $inSize = var$10.length;
                    if ($outPos < $inSize)
                        $inSize = $outPos;
                    jn_CharBuffer_get($in, $inArray, $i, $inSize - $i | 0);
                    $inPos = 0;
                }
            }
            $i = $out.$position;
            $outSize_0 = $out.$limit;
            if (!($i >= $outSize_0 ? 0 : 1)) {
                $i = $in.$position >= $in.$limit ? 0 : 1;
                $result = !$i && $inPos >= $inSize ? jnc_CoderResult_UNDERFLOW : jnc_CoderResult_OVERFLOW;
                break a;
            }
            var$10 = $outArray.data;
            $outSize = $outSize_0 - $i | 0;
            $outSize_0 = var$10.length;
            if ($outSize < $outSize_0)
                $outSize_0 = $outSize;
            $controller = new jnci_BufferedEncoder$Controller;
            $controller.$in = $in;
            $controller.$out1 = $out;
            $result = jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, 0, $outSize_0, $controller);
            $inPos = $controller.$inPosition;
            $outPos = $controller.$outPosition;
            if ($result === null) {
                $i = $in.$position >= $in.$limit ? 0 : 1;
                if (!$i && $inPos >= $inSize)
                    $result = jnc_CoderResult_UNDERFLOW;
                else if (!($out.$position >= $out.$limit ? 0 : 1) && $inPos >= $inSize)
                    $result = jnc_CoderResult_OVERFLOW;
            }
            jn_ByteBuffer_put($out, $outArray, 0, $outPos);
            if ($result !== null)
                break;
        }
    }
    jn_Buffer_position($in, $in.$position - ($inSize - $inPos | 0) | 0);
    return $result;
}
var jnci_UTF8Encoder = $rt_classWithoutFields(jnci_BufferedEncoder);
function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
    var $result, var$9, var$10, $ch, $low, var$13, $codePoint, var$15;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize) {
                var$9 = $inPos;
                break a;
            }
            var$10 = $inArray.data;
            var$9 = $inPos + 1 | 0;
            $ch = var$10[$inPos];
            if ($ch < 128) {
                var$10 = $outArray.data;
                $low = $outPos + 1 | 0;
                var$10[$outPos] = $ch << 24 >> 24;
            } else if ($ch < 2048) {
                if (($outPos + 2 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    var$13 = $controller.$out1;
                    if ((var$13.$limit - var$13.$position | 0) < 2 ? 0 : 1)
                        break a;
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $inPos = $outPos + 1 | 0;
                var$10[$outPos] = (192 | $ch >> 6) << 24 >> 24;
                $low = $inPos + 1 | 0;
                var$10[$inPos] = (128 | $ch & 63) << 24 >> 24;
            } else {
                $codePoint = $ch & 64512;
                $low = $rt_compare($codePoint, 55296);
                $inPos = $low ? 0 : 1;
                if (!(!$inPos && !($codePoint != 56320 ? 0 : 1) ? 0 : 1)) {
                    if (($outPos + 3 | 0) > $outSize) {
                        var$9 = var$9 + (-1) | 0;
                        var$13 = $controller.$out1;
                        if ((var$13.$limit - var$13.$position | 0) < 3 ? 0 : 1)
                            break a;
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$10 = $outArray.data;
                    $inPos = $outPos + 1 | 0;
                    var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                    $outPos = $inPos + 1 | 0;
                    var$10[$inPos] = (128 | $ch >> 6 & 63) << 24 >> 24;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (128 | $ch & 63) << 24 >> 24;
                } else {
                    if (!($low ? 0 : 1)) {
                        $result = new jnc_CoderResult;
                        $result.$kind = 2;
                        $result.$length0 = 1;
                        break a;
                    }
                    if (var$9 >= $inSize) {
                        var$13 = $controller.$in;
                        if (var$13.$position >= var$13.$limit ? 0 : 1)
                            break a;
                        $result = jnc_CoderResult_UNDERFLOW;
                        break a;
                    }
                    var$15 = var$9 + 1 | 0;
                    $low = var$10[var$9];
                    if (!(($low & 64512) != 56320 ? 0 : 1)) {
                        var$9 = var$15 + (-2) | 0;
                        $result = new jnc_CoderResult;
                        $result.$kind = 2;
                        $result.$length0 = 1;
                        break a;
                    }
                    if (($outPos + 4 | 0) > $outSize) {
                        var$9 = var$15 + (-2) | 0;
                        var$13 = $controller.$out1;
                        if ((var$13.$limit - var$13.$position | 0) < 4 ? 0 : 1)
                            break a;
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$10 = $outArray.data;
                    $codePoint = (($ch & 1023) << 10 | $low & 1023) + 65536 | 0;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                    $inPos = $low + 1 | 0;
                    var$10[$low] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                    $outPos = $inPos + 1 | 0;
                    var$10[$inPos] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (128 | $codePoint & 63) << 24 >> 24;
                    var$9 = var$15;
                }
            }
            $inPos = var$9;
            $outPos = $low;
        }
        var$9 = $inPos;
    }
    $controller.$inPosition = var$9;
    $controller.$outPosition = $outPos;
    return $result;
}
var ji_IOException = $rt_classWithoutFields(jl_Exception);
var jlr_Array = $rt_classWithoutFields();
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    return var$1.data.length;
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
var jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jur_AbstractSet() {
    var a = this; jl_Object.call(a);
    a.$next0 = null;
    a.$isSecondPassVisited = 0;
    a.$index1 = null;
    a.$type = 0;
}
var jur_AbstractSet_counter = 0;
function jur_AbstractSet__init_($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
}
function jur_AbstractSet__init_0($this, $n) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$next0 = $n;
}
function jur_AbstractSet_find($this, $stringIndex, $testString, $matchResult) {
    var $length;
    $length = $matchResult.$rightBound;
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
}
function jur_AbstractSet_findBack($this, $stringIndex, $startSearch, $testString, $matchResult) {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
}
function jur_AbstractSet_setType($this, $type) {
    $this.$type = $type;
}
function jur_AbstractSet_getType($this) {
    return $this.$type;
}
function jur_AbstractSet_getNext($this) {
    return $this.$next0;
}
function jur_AbstractSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_AbstractSet_first($this, $set) {
    return 1;
}
function jur_AbstractSet_processBackRefReplacement($this) {
    return null;
}
function jur_AbstractSet_processSecondPass($this) {
    var $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next0;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next0.$isSecondPassVisited = 1;
                $this.$next0 = $set;
            }
            $this.$next0.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$next0 = $set.$next0;
    }
}
function jur_AbstractSet__clinit_() {
    jur_AbstractSet_counter = 1;
}
var jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
var otjc_JSArray = $rt_classWithoutFields();
function otjc_JSArray_get$exported$0(var$0, var$1) {
    return var$0.$get(var$1);
}
function otjc_JSArray_getLength$exported$1(var$0) {
    return var$0.$getLength0();
}
var otjc_JSString = $rt_classWithoutFields();
function jur_FSet() {
    var a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex = 0;
}
var jur_FSet_posFSet = null;
function jur_FSet_$callClinit() {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
}
function jur_FSet__init_0(var_0) {
    var var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
}
function jur_FSet__init_($this, $groupIndex) {
    var var$2, var$3;
    jur_FSet_$callClinit();
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$groupIndex = $groupIndex;
}
function jur_FSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $end, var$5, $shift;
    $end = $this.$groupIndex;
    var$5 = $matchResult.$groupBounds.data;
    $shift = ($end * 2 | 0) + 1 | 0;
    $end = var$5[$shift];
    var$5[$shift] = $stringIndex;
    $shift = $this.$next0.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0) {
        $stringIndex = $this.$groupIndex;
        $matchResult.$groupBounds.data[($stringIndex * 2 | 0) + 1 | 0] = $end;
    }
    return $shift;
}
function jur_FSet_getGroupIndex($this) {
    return $this.$groupIndex;
}
function jur_FSet_hasConsumed($this, $mr) {
    return 0;
}
function jur_FSet__clinit_() {
    var var$1, var$2, var$3;
    var$1 = new jur_FSet$PossessiveFSet;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    var$1.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    jur_FSet_posFSet = var$1;
}
function jur_Lexer() {
    var a = this; jl_Object.call(a);
    a.$pattern1 = null;
    a.$flags0 = 0;
    a.$mode = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead = 0;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
var jur_Lexer_decompTable = null;
var jur_Lexer_singleDecompTable = null;
var jur_Lexer_singleDecompTableSize = 0;
function jur_Lexer__init_(var_0, var_1) {
    var var_2 = new jur_Lexer();
    jur_Lexer__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_Lexer__init_0($this, $pattern, $flags) {
    var var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    a: {
        $this.$mode = 1;
        $this.$orig = $pattern;
        if (($flags & 16) > 0) {
            var$3 = new jl_StringBuilder;
            var$3.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(66));
            var$4 = 0;
            while (true) {
                var$5 = jl_String_indexOf0($pattern, $rt_s(67), var$4);
                if (var$5 < 0) {
                    var$6 = $pattern.$characters.data;
                    var$5 = var$6.length;
                    if (var$4 > var$5) {
                        $pattern = new jl_IndexOutOfBoundsException;
                        $pattern.$suppressionEnabled = 1;
                        $pattern.$writableStackTrace = 1;
                        $rt_throw($pattern);
                    }
                    $pattern = new jl_String;
                    var$7 = var$5 - var$4 | 0;
                    var$8 = $rt_createCharArray(var$7);
                    var$9 = var$8.data;
                    $pattern.$characters = var$8;
                    var$5 = 0;
                    while (var$5 < var$7) {
                        var$9[var$5] = var$6[var$5 + var$4 | 0];
                        var$5 = var$5 + 1 | 0;
                    }
                    jl_AbstractStringBuilder_insert(var$3, var$3.$length, $pattern);
                    jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(67));
                    $pattern = new jl_String;
                    var$6 = var$3.$buffer;
                    var$10 = var$3.$length;
                    var$8 = $rt_createCharArray(var$10);
                    var$9 = var$8.data;
                    $pattern.$characters = var$8;
                    var$4 = 0;
                    while (var$4 < var$10) {
                        var$9[var$4] = var$6.data[var$4 + 0 | 0];
                        var$4 = var$4 + 1 | 0;
                    }
                    break a;
                }
                var$7 = var$5 + 2 | 0;
                if (var$4 > var$7)
                    break;
                var$11 = new jl_String;
                var$8 = $pattern.$characters;
                var$5 = var$7 - var$4 | 0;
                var$9 = $rt_createCharArray(var$5);
                var$6 = var$9.data;
                var$11.$characters = var$9;
                var$10 = 0;
                while (var$10 < var$5) {
                    var$6[var$10] = var$8.data[var$10 + var$4 | 0];
                    var$10 = var$10 + 1 | 0;
                }
                jl_AbstractStringBuilder_insert(var$3, var$3.$length, var$11);
                jl_AbstractStringBuilder_insert(var$3, var$3.$length, $rt_s(68));
                var$4 = var$7;
            }
            $pattern = new jl_IndexOutOfBoundsException;
            $pattern.$suppressionEnabled = 1;
            $pattern.$writableStackTrace = 1;
            $rt_throw($pattern);
        } else if (($flags & 128) <= 0) {
        }
    }
    var$8 = $pattern.$characters.data;
    var$5 = var$8.length;
    var$9 = $rt_createCharArray(var$5 + 2 | 0);
    $this.$pattern1 = var$9;
    var$6 = $rt_createCharArray(var$5);
    var$12 = var$6.data;
    var$7 = 0;
    var$10 = var$12.length;
    while (var$7 < var$10) {
        var$12[var$7] = var$8[var$7];
        var$7 = var$7 + 1 | 0;
    }
    jl_System_arraycopy(var$6, 0, var$9, 0, var$5);
    var$8 = $this.$pattern1.data;
    var$7 = var$8.length;
    var$8[var$7 - 1 | 0] = 0;
    var$8[var$7 - 2 | 0] = 0;
    $this.$patternFullLength = var$7;
    $this.$flags0 = $flags;
    jur_Lexer_movePointer($this);
    jur_Lexer_movePointer($this);
}
function jur_Lexer_peek($this) {
    return $this.$ch;
}
function jur_Lexer_setMode($this, $mode) {
    if ($mode > 0 && $mode < 3)
        $this.$mode = $mode;
    if ($mode == 1) {
        $this.$lookAhead = $this.$ch;
        $this.$lookAheadST = $this.$curST;
        $this.$index = $this.$lookAheadToc;
        $this.$lookAheadToc = $this.$curToc;
        jur_Lexer_movePointer($this);
    }
}
function jur_Lexer_restoreFlags($this, $flags) {
    var var$2;
    $this.$flags0 = $flags;
    $this.$lookAhead = $this.$ch;
    $this.$lookAheadST = $this.$curST;
    var$2 = $this.$curToc;
    $this.$index = var$2 + 1 | 0;
    $this.$lookAheadToc = var$2;
    jur_Lexer_movePointer($this);
}
function jur_Lexer_peekSpecial($this) {
    return $this.$curST;
}
function jur_Lexer_isSpecial($this) {
    return $this.$curST === null ? 0 : 1;
}
function jur_Lexer_next($this) {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
}
function jur_Lexer_nextSpecial($this) {
    var $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
}
function jur_Lexer_lookAhead($this) {
    return $this.$lookAhead;
}
function jur_Lexer_back($this) {
    return $this.$lookBack;
}
function jur_Lexer_movePointer($this) {
    var $reread, $nonCap, var$3, $behind, $mod, $cs, $negative, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    while (true) {
        $reread = 0;
        $nonCap = $this.$index >= $this.$pattern1.data.length ? 0 : jur_Lexer_nextCodePoint($this);
        $this.$lookAhead = $nonCap;
        $this.$lookAheadST = null;
        if ($this.$mode == 4) {
            if ($nonCap != 92)
                return;
            $nonCap = $this.$index;
            var$3 = $this.$pattern1.data;
            $nonCap = $nonCap >= var$3.length ? 0 : var$3[jur_Lexer_nextIndex($this)];
            $this.$lookAhead = $nonCap;
            switch ($nonCap) {
                case 69:
                    break;
                default:
                    $this.$lookAhead = 92;
                    $this.$index = $this.$prevNW;
                    return;
            }
            $this.$mode = $this.$savedMode;
            $this.$lookAhead = $this.$index > ($this.$pattern1.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
        }
        a: {
            $nonCap = $this.$lookAhead;
            if ($nonCap != 92) {
                $behind = $this.$mode;
                if ($behind == 1)
                    switch ($nonCap) {
                        case 36:
                            $this.$lookAhead = (-536870876);
                            break a;
                        case 40:
                            if ($this.$pattern1.data[$this.$index] != 63) {
                                $this.$lookAhead = (-2147483608);
                                break a;
                            }
                            jur_Lexer_nextIndex($this);
                            $nonCap = $this.$pattern1.data[$this.$index];
                            $behind = 0;
                            while (true) {
                                b: {
                                    if ($behind) {
                                        $behind = 0;
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 61:
                                                $this.$lookAhead = (-134217688);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            default:
                                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this), $this.$index));
                                        }
                                        $this.$lookAhead = (-67108824);
                                        jur_Lexer_nextIndex($this);
                                    } else {
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 60:
                                                jur_Lexer_nextIndex($this);
                                                $nonCap = $this.$pattern1.data[$this.$index];
                                                $behind = 1;
                                                break b;
                                            case 61:
                                                $this.$lookAhead = (-536870872);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            case 62:
                                                $this.$lookAhead = (-33554392);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            default:
                                                $mod = jur_Lexer_readFlags($this);
                                                $this.$lookAhead = $mod;
                                                if ($mod < 256) {
                                                    $this.$flags0 = $mod;
                                                    $mod = $mod << 16;
                                                    $this.$lookAhead = $mod;
                                                    $this.$lookAhead = (-1073741784) | $mod;
                                                    break b;
                                                }
                                                $mod = $mod & 255;
                                                $this.$lookAhead = $mod;
                                                $this.$flags0 = $mod;
                                                $mod = $mod << 16;
                                                $this.$lookAhead = $mod;
                                                $this.$lookAhead = (-16777176) | $mod;
                                                break b;
                                        }
                                        $this.$lookAhead = (-268435416);
                                        jur_Lexer_nextIndex($this);
                                    }
                                }
                                if (!$behind)
                                    break;
                            }
                            break a;
                        case 41:
                            $this.$lookAhead = (-536870871);
                            break a;
                        case 42:
                        case 43:
                        case 63:
                            $behind = $this.$index;
                            var$3 = $this.$pattern1.data;
                            switch ($behind >= var$3.length ? 42 : var$3[$behind]) {
                                case 43:
                                    $this.$lookAhead = $nonCap | (-2147483648);
                                    jur_Lexer_nextIndex($this);
                                    break a;
                                case 63:
                                    $this.$lookAhead = $nonCap | (-1073741824);
                                    jur_Lexer_nextIndex($this);
                                    break a;
                                default:
                            }
                            $this.$lookAhead = $nonCap | (-536870912);
                            break a;
                        case 46:
                            $this.$lookAhead = (-536870866);
                            break a;
                        case 91:
                            $this.$lookAhead = (-536870821);
                            jur_Lexer_setMode($this, 2);
                            break a;
                        case 93:
                            if ($behind != 2)
                                break a;
                            $this.$lookAhead = (-536870819);
                            break a;
                        case 94:
                            $this.$lookAhead = (-536870818);
                            break a;
                        case 123:
                            $this.$lookAheadST = jur_Lexer_processQuantifier($this, $nonCap);
                            break a;
                        case 124:
                            $this.$lookAhead = (-536870788);
                            break a;
                        default:
                    }
                else if ($behind == 2)
                    switch ($nonCap) {
                        case 38:
                            $this.$lookAhead = (-536870874);
                            break a;
                        case 45:
                            $this.$lookAhead = (-536870867);
                            break a;
                        case 91:
                            $this.$lookAhead = (-536870821);
                            break a;
                        case 93:
                            $this.$lookAhead = (-536870819);
                            break a;
                        case 94:
                            $this.$lookAhead = (-536870818);
                            break a;
                        default:
                    }
            } else {
                $nonCap = $this.$index >= ($this.$pattern1.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                c: {
                    $this.$lookAhead = $nonCap;
                    switch ($nonCap) {
                        case -1:
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this), $this.$index));
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                        case 58:
                        case 59:
                        case 60:
                        case 61:
                        case 62:
                        case 63:
                        case 64:
                        case 91:
                        case 92:
                        case 93:
                        case 94:
                        case 95:
                        case 96:
                        case 118:
                            break;
                        case 48:
                            $this.$lookAhead = jur_Lexer_readOctals($this);
                            break a;
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            if ($this.$mode != 1)
                                break a;
                            $this.$lookAhead = (-2147483648) | $nonCap;
                            break a;
                        case 65:
                            $this.$lookAhead = (-2147483583);
                            break a;
                        case 66:
                            $this.$lookAhead = (-2147483582);
                            break a;
                        case 67:
                        case 69:
                        case 70:
                        case 72:
                        case 73:
                        case 74:
                        case 75:
                        case 76:
                        case 77:
                        case 78:
                        case 79:
                        case 82:
                        case 84:
                        case 85:
                        case 86:
                        case 88:
                        case 89:
                        case 103:
                        case 104:
                        case 105:
                        case 106:
                        case 107:
                        case 108:
                        case 109:
                        case 111:
                        case 113:
                        case 121:
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this), $this.$index));
                        case 68:
                        case 83:
                        case 87:
                        case 100:
                        case 115:
                        case 119:
                            $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_1($this.$pattern1, $this.$prevNW, 1), 0);
                            $this.$lookAhead = 0;
                            break a;
                        case 71:
                            $this.$lookAhead = (-2147483577);
                            break a;
                        case 80:
                        case 112:
                            break c;
                        case 81:
                            $this.$savedMode = $this.$mode;
                            $this.$mode = 4;
                            $reread = 1;
                            break a;
                        case 90:
                            $this.$lookAhead = (-2147483558);
                            break a;
                        case 97:
                            $this.$lookAhead = 7;
                            break a;
                        case 98:
                            $this.$lookAhead = (-2147483550);
                            break a;
                        case 99:
                            $nonCap = $this.$index;
                            var$3 = $this.$pattern1.data;
                            if ($nonCap >= (var$3.length - 2 | 0))
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this), $this.$index));
                            $this.$lookAhead = var$3[jur_Lexer_nextIndex($this)] & 31;
                            break a;
                        case 101:
                            $this.$lookAhead = 27;
                            break a;
                        case 102:
                            $this.$lookAhead = 12;
                            break a;
                        case 110:
                            $this.$lookAhead = 10;
                            break a;
                        case 114:
                            $this.$lookAhead = 13;
                            break a;
                        case 116:
                            $this.$lookAhead = 9;
                            break a;
                        case 117:
                            $this.$lookAhead = jur_Lexer_readHex($this, 4);
                            break a;
                        case 120:
                            $this.$lookAhead = jur_Lexer_readHex($this, 2);
                            break a;
                        case 122:
                            $this.$lookAhead = (-2147483526);
                            break a;
                        default:
                    }
                    break a;
                }
                $cs = jur_Lexer_parseCharClassName($this);
                $negative = 0;
                if ($this.$lookAhead == 80)
                    $negative = 1;
                try {
                    $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof ju_MissingResourceException) {
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(47), jur_Lexer_toString($this), $this.$index));
                    } else {
                        throw $$e;
                    }
                }
                $this.$lookAhead = 0;
            }
        }
        if ($reread)
            continue;
        else
            break;
    }
}
function jur_Lexer_parseCharClassName($this) {
    var $sb, $ch, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    $sb = new jl_StringBuilder;
    $sb.$buffer = $rt_createCharArray(10);
    $ch = $this.$index;
    var$3 = $this.$pattern1.data;
    if ($ch < (var$3.length - 2 | 0)) {
        if (var$3[$ch] != 123) {
            $sb = new jl_StringBuilder;
            $sb.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert($sb, $sb.$length, $rt_s(69));
            var$4 = new jl_String;
            var$3 = $this.$pattern1;
            var$5 = $this.$index;
            $this.$prevNW = var$5;
            if ($this.$flags0 & 4)
                jur_Lexer_skipComments($this);
            else
                $this.$index = var$5 + 1 | 0;
            var$6 = $this.$prevNW;
            var$7 = $rt_createCharArray(1);
            var$8 = var$7.data;
            var$4.$characters = var$7;
            var$5 = 0;
            while (var$5 < 1) {
                var$8[var$5] = var$3.data[var$5 + var$6 | 0];
                var$5 = var$5 + 1 | 0;
            }
            jl_AbstractStringBuilder_insert($sb, $sb.$length, var$4);
            var$4 = new jl_String;
            var$3 = $sb.$buffer;
            var$5 = $sb.$length;
            var$7 = $rt_createCharArray(var$5);
            var$8 = var$7.data;
            var$4.$characters = var$7;
            var$9 = 0;
            while (var$9 < var$5) {
                var$8[var$9] = var$3.data[var$9 + 0 | 0];
                var$9 = var$9 + 1 | 0;
            }
            return var$4;
        }
        $this.$prevNW = $ch;
        if ($this.$flags0 & 4)
            jur_Lexer_skipComments($this);
        else
            $this.$index = $ch + 1 | 0;
        $ch = 0;
        a: {
            while (true) {
                var$5 = $this.$index;
                var$3 = $this.$pattern1.data;
                if (var$5 >= (var$3.length - 2 | 0))
                    break;
                $this.$prevNW = var$5;
                if ($this.$flags0 & 4)
                    jur_Lexer_skipComments($this);
                else
                    $this.$index = var$5 + 1 | 0;
                $ch = var$3[$this.$prevNW];
                if ($ch == 125)
                    break a;
                var$5 = $sb.$length;
                jl_AbstractStringBuilder_insertSpace($sb, var$5, var$5 + 1 | 0);
                $sb.$buffer.data[var$5] = $ch;
            }
        }
        if ($ch != 125) {
            $sb = new jur_PatternSyntaxException;
            var$10 = $this.$orig;
            $ch = $this.$index;
            $sb.$suppressionEnabled = 1;
            $sb.$writableStackTrace = 1;
            $sb.$index0 = (-1);
            $sb.$desc = $rt_s(47);
            $sb.$pattern = var$10;
            $sb.$index0 = $ch;
            $rt_throw($sb);
        }
    }
    $ch = $sb.$length;
    if (!$ch) {
        $sb = new jur_PatternSyntaxException;
        var$10 = $this.$orig;
        $ch = $this.$index;
        $sb.$suppressionEnabled = 1;
        $sb.$writableStackTrace = 1;
        $sb.$index0 = (-1);
        $sb.$desc = $rt_s(47);
        $sb.$pattern = var$10;
        $sb.$index0 = $ch;
        $rt_throw($sb);
    }
    var$4 = new jl_String;
    var$3 = $sb.$buffer;
    var$7 = $rt_createCharArray($ch);
    var$8 = var$7.data;
    var$4.$characters = var$7;
    var$9 = 0;
    while (var$9 < $ch) {
        var$8[var$9] = var$3.data[var$9 + 0 | 0];
        var$9 = var$9 + 1 | 0;
    }
    var$5 = var$8.length;
    if (var$5 == 1) {
        $sb = new jl_StringBuilder;
        $sb.$buffer = $rt_createCharArray(16);
        jl_AbstractStringBuilder_insert($sb, $sb.$length, $rt_s(69));
        jl_AbstractStringBuilder_insert($sb, $sb.$length, var$4);
        var$4 = new jl_String;
        var$3 = $sb.$buffer;
        var$5 = $sb.$length;
        var$7 = $rt_createCharArray(var$5);
        var$8 = var$7.data;
        var$4.$characters = var$7;
        var$9 = 0;
        while (var$9 < var$5) {
            var$8[var$9] = var$3.data[var$9 + 0 | 0];
            var$9 = var$9 + 1 | 0;
        }
        return var$4;
    }
    b: {
        c: {
            if (var$5 > 3) {
                if (var$4 === $rt_s(69) ? 1 : jl_String_startsWith(var$4, $rt_s(69), 0))
                    break c;
                if (jl_String_startsWith0(var$4, $rt_s(70)))
                    break c;
            }
            break b;
        }
        var$4 = jl_String_substring(var$4, 2, var$4.$characters.data.length);
    }
    return var$4;
}
function jur_Lexer_processQuantifier($this, $ch) {
    var $sb, $min, $max, var$5, var$6, $mod, var$8, $$je;
    $sb = new jl_StringBuilder;
    $sb.$buffer = $rt_createCharArray(4);
    $min = (-1);
    $max = 2147483647;
    a: {
        while (true) {
            var$5 = $this.$index;
            var$6 = $this.$pattern1.data;
            if (var$5 >= var$6.length)
                break a;
            $this.$prevNW = var$5;
            if ($this.$flags0 & 4)
                jur_Lexer_skipComments($this);
            else
                $this.$index = var$5 + 1 | 0;
            $ch = var$6[$this.$prevNW];
            if ($ch == 125)
                break a;
            if ($ch == 44 && $min < 0)
                try {
                    $min = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                    jl_StringBuilder_delete($sb, 0, jl_StringBuilder_length($sb));
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            $mod = $ch & 65535;
            var$5 = $sb.$length;
            jl_AbstractStringBuilder_insertSpace($sb, var$5, var$5 + 1 | 0);
            $sb.$buffer.data[var$5] = $mod;
        }
        $sb = new jur_PatternSyntaxException;
        var$8 = $this.$orig;
        $ch = $this.$index;
        $sb.$suppressionEnabled = 1;
        $sb.$writableStackTrace = 1;
        $sb.$index0 = (-1);
        $sb.$desc = $rt_s(47);
        $sb.$pattern = var$8;
        $sb.$index0 = $ch;
        $rt_throw($sb);
    }
    if ($ch != 125) {
        $sb = new jur_PatternSyntaxException;
        var$8 = $this.$orig;
        $ch = $this.$index;
        $sb.$suppressionEnabled = 1;
        $sb.$writableStackTrace = 1;
        $sb.$index0 = (-1);
        $sb.$desc = $rt_s(47);
        $sb.$pattern = var$8;
        $sb.$index0 = $ch;
        $rt_throw($sb);
    }
    if ($sb.$length > 0)
        b: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                if ($min >= 0)
                    break b;
                $min = $max;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                } else {
                    throw $$e;
                }
            }
            $sb = new jur_PatternSyntaxException;
            var$8 = $this.$orig;
            $ch = $this.$index;
            $sb.$suppressionEnabled = 1;
            $sb.$writableStackTrace = 1;
            $sb.$index0 = (-1);
            $sb.$desc = $rt_s(47);
            $sb.$pattern = var$8;
            $sb.$index0 = $ch;
            $rt_throw($sb);
        }
    else if ($min < 0) {
        $sb = new jur_PatternSyntaxException;
        var$8 = $this.$orig;
        $ch = $this.$index;
        $sb.$suppressionEnabled = 1;
        $sb.$writableStackTrace = 1;
        $sb.$index0 = (-1);
        $sb.$desc = $rt_s(47);
        $sb.$pattern = var$8;
        $sb.$index0 = $ch;
        $rt_throw($sb);
    }
    if (($min | $max | ($max - $min | 0)) < 0) {
        $sb = new jur_PatternSyntaxException;
        var$8 = $this.$orig;
        $ch = $this.$index;
        $sb.$suppressionEnabled = 1;
        $sb.$writableStackTrace = 1;
        $sb.$index0 = (-1);
        $sb.$desc = $rt_s(47);
        $sb.$pattern = var$8;
        $sb.$index0 = $ch;
        $rt_throw($sb);
    }
    var$5 = $this.$index;
    var$6 = $this.$pattern1.data;
    $mod = var$5 >= var$6.length ? 42 : var$6[var$5];
    c: {
        switch ($mod) {
            case 43:
                $this.$lookAhead = (-2147483525);
                $this.$prevNW = var$5;
                if ($this.$flags0 & 4)
                    jur_Lexer_skipComments($this);
                else
                    $this.$index = var$5 + 1 | 0;
                break c;
            case 63:
                $this.$lookAhead = (-1073741701);
                $this.$prevNW = var$5;
                if ($this.$flags0 & 4)
                    jur_Lexer_skipComments($this);
                else
                    $this.$index = var$5 + 1 | 0;
                break c;
            default:
        }
        $this.$lookAhead = (-536870789);
    }
    $sb = new jur_Quantifier;
    $sb.$min = $min;
    $sb.$max = $max;
    return $sb;
}
function jur_Lexer_toString($this) {
    return $this.$orig;
}
function jur_Lexer_isEmpty($this) {
    return !$this.$ch && !$this.$lookAhead && $this.$index == $this.$patternFullLength && !($this.$curST === null ? 0 : 1) ? 1 : 0;
}
function jur_Lexer_isLetter0($ch) {
    return $ch < 0 ? 0 : 1;
}
function jur_Lexer_isLetter($this) {
    var var$1, var$2;
    var$1 = $this.$ch;
    var$2 = !var$1 && !$this.$lookAhead && $this.$index == $this.$patternFullLength && !($this.$curST === null ? 0 : 1) ? 1 : 0;
    return !var$2 && !($this.$curST === null ? 0 : 1) && (var$1 < 0 ? 0 : 1) ? 1 : 0;
}
function jur_Lexer_isLowSurrogate($this) {
    var var$1;
    var$1 = $this.$ch;
    return var$1 <= 57343 && var$1 >= 56320 ? 1 : 0;
}
function jur_Lexer_isHighSurrogate($ch) {
    return $ch <= 56319 && $ch >= 55296 ? 1 : 0;
}
function jur_Lexer_isLowSurrogate0($ch) {
    return $ch <= 57343 && $ch >= 56320 ? 1 : 0;
}
function jur_Lexer_readHex($this, $max) {
    var $st, $length, $i, var$5, var$6, var$7, var$8, var$9, $$je;
    $st = new jl_StringBuilder;
    $st.$buffer = $rt_createCharArray($max);
    $length = $this.$pattern1.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        var$6 = $this.$index;
        if (var$6 >= $length)
            break;
        var$7 = $this.$pattern1;
        $this.$prevNW = var$6;
        if ($this.$flags0 & 4)
            jur_Lexer_skipComments($this);
        else
            $this.$index = var$6 + 1 | 0;
        var$6 = var$7.data[$this.$prevNW];
        var$8 = $st.$length;
        jl_AbstractStringBuilder_insertSpace($st, var$8, var$8 + 1 | 0);
        $st.$buffer.data[var$8] = var$6;
        $i = $i + 1 | 0;
    }
    if (!var$5)
        a: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($st), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $max;
        }
    $st = new jur_PatternSyntaxException;
    var$9 = $this.$orig;
    $max = $this.$index;
    $st.$suppressionEnabled = 1;
    $st.$writableStackTrace = 1;
    $st.$index0 = (-1);
    $st.$desc = $rt_s(47);
    $st.$pattern = var$9;
    $st.$index0 = $max;
    $rt_throw($st);
}
function jur_Lexer_readOctals($this) {
    var $max, $i, var$3, $length, $first, var$6, var$7, var$8, var$9, var$10;
    $max = 3;
    $i = 1;
    var$3 = $this.$pattern1.data;
    $length = var$3.length - 2 | 0;
    $first = jl_Character_getNumericValue(var$3[$this.$index]);
    if ($first >= 8)
        $first = (-1);
    switch ($first) {
        case -1:
            break;
        default:
            if ($first > 3)
                $max = 2;
            var$6 = $this.$index;
            $this.$prevNW = var$6;
            if ($this.$flags0 & 4)
                jur_Lexer_skipComments($this);
            else
                $this.$index = var$6 + 1 | 0;
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    var$7 = $this.$index;
                    if (var$7 >= $length)
                        break a;
                    var$8 = jl_Character_getNumericValue($this.$pattern1.data[var$7]);
                    if (var$8 >= 8)
                        var$8 = (-1);
                    if (var$8 < 0)
                        break;
                    $first = ($first * 8 | 0) + var$8 | 0;
                    var$6 = $this.$index;
                    $this.$prevNW = var$6;
                    if ($this.$flags0 & 4)
                        jur_Lexer_skipComments($this);
                    else
                        $this.$index = var$6 + 1 | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $first;
    }
    var$9 = new jur_PatternSyntaxException;
    var$10 = $this.$orig;
    $max = $this.$index;
    var$9.$suppressionEnabled = 1;
    var$9.$writableStackTrace = 1;
    var$9.$index0 = (-1);
    var$9.$desc = $rt_s(47);
    var$9.$pattern = var$10;
    var$9.$index0 = $max;
    $rt_throw(var$9);
}
function jur_Lexer_readFlags($this) {
    var $pos, $res, var$3, var$4, var$5, var$6, var$7;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        var$3 = $this.$index;
        var$4 = $this.$pattern1.data;
        if (var$3 >= var$4.length) {
            var$5 = new jur_PatternSyntaxException;
            var$6 = $this.$orig;
            var$5.$suppressionEnabled = 1;
            var$5.$writableStackTrace = 1;
            var$5.$index0 = (-1);
            var$5.$desc = $rt_s(47);
            var$5.$pattern = var$6;
            var$5.$index0 = var$3;
            $rt_throw(var$5);
        }
        b: {
            c: {
                switch (var$4[var$3]) {
                    case 41:
                        $this.$prevNW = var$3;
                        if ($this.$flags0 & 4)
                            jur_Lexer_skipComments($this);
                        else
                            $this.$index = var$3 + 1 | 0;
                        return $res | 256;
                    case 45:
                        if (!$pos) {
                            var$7 = new jur_PatternSyntaxException;
                            var$6 = $this.$orig;
                            var$7.$suppressionEnabled = 1;
                            var$7.$writableStackTrace = 1;
                            var$7.$index0 = (-1);
                            var$7.$desc = $rt_s(47);
                            var$7.$pattern = var$6;
                            var$7.$index0 = var$3;
                            $rt_throw(var$7);
                        }
                        $pos = 0;
                        break b;
                    case 58:
                        break a;
                    case 100:
                        break c;
                    case 105:
                        $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                        break b;
                    case 109:
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    case 115:
                        $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                        break b;
                    case 117:
                        $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                        break b;
                    case 120:
                        $res = $pos ? $res | 4 : ($res ^ 4) & $res;
                        break b;
                    default:
                }
                break b;
            }
            $res = $pos ? $res | 1 : ($res ^ 1) & $res;
        }
        $this.$prevNW = var$3;
        if ($this.$flags0 & 4)
            jur_Lexer_skipComments($this);
        else
            $this.$index = var$3 + 1 | 0;
    }
    $this.$prevNW = var$3;
    if ($this.$flags0 & 4)
        jur_Lexer_skipComments($this);
    else
        $this.$index = var$3 + 1 | 0;
    return $res;
}
function jur_Lexer_nextIndex($this) {
    var var$1;
    var$1 = $this.$index;
    $this.$prevNW = var$1;
    if ($this.$flags0 & 4)
        jur_Lexer_skipComments($this);
    else
        $this.$index = var$1 + 1 | 0;
    return $this.$prevNW;
}
function jur_Lexer_skipComments($this) {
    var $length, var$2, var$3, var$4;
    $length = $this.$pattern1.data.length - 2 | 0;
    $this.$index = $this.$index + 1 | 0;
    a: while (true) {
        var$2 = $this.$index;
        if (var$2 < $length) {
            b: {
                var$2 = $this.$pattern1.data[var$2];
                switch (var$2) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                        break;
                    case 160:
                    case 8199:
                    case 8239:
                        var$2 = 0;
                        break b;
                    default:
                        c: {
                            switch (jl_Character_getType(var$2)) {
                                case 12:
                                case 13:
                                case 14:
                                    break;
                                default:
                                    var$2 = 0;
                                    break c;
                            }
                            var$2 = 1;
                        }
                        break b;
                }
                var$2 = 1;
            }
            if (var$2) {
                $this.$index = $this.$index + 1 | 0;
                continue;
            }
        }
        var$2 = $this.$index;
        if (var$2 >= $length)
            break;
        var$3 = $this.$pattern1.data;
        if (var$3[var$2] != 35)
            break;
        $this.$index = var$2 + 1 | 0;
        while (true) {
            var$4 = $this.$index;
            if (var$4 >= $length)
                continue a;
            var$2 = var$3[var$4];
            if (var$2 != 10 && var$2 != 13 && var$2 != 133 && (var$2 | 1) != 8233 ? 0 : 1)
                continue a;
            $this.$index = var$4 + 1 | 0;
        }
    }
    return var$2;
}
function jur_Lexer_getHangulDecomposition($ch) {
    var $sIndex, $l, $v, $t;
    $sIndex = $ch - 44032 | 0;
    if ($sIndex >= 0 && $sIndex < 11172) {
        $l = 4352 + ($sIndex / 588 | 0) | 0;
        $v = 4449 + (($sIndex % 588 | 0) / 28 | 0) | 0;
        $t = $sIndex % 28 | 0;
        return !$t ? $rt_createIntArrayFromData([$l, $v]) : $rt_createIntArrayFromData([$l, $v, 4519 + $t | 0]);
    }
    return null;
}
function jur_Lexer_hasSingleCodepointDecomposition($ch) {
    return jur_Lexer_singleDecompTable.$get2($ch) == jur_Lexer_singleDecompTableSize ? 0 : 1;
}
function jur_Lexer_hasDecompositionNonNullCanClass($ch) {
    return ($ch != 832 ? 0 : 1) | ($ch != 833 ? 0 : 1) | ($ch != 835 ? 0 : 1) | ($ch != 836 ? 0 : 1);
}
function jur_Lexer_nextCodePoint($this) {
    var var$1, $lowExpectedIndex, var$3, $high, $low;
    var$1 = $this.$pattern1;
    $lowExpectedIndex = $this.$index;
    $this.$prevNW = $lowExpectedIndex;
    if ($this.$flags0 & 4)
        jur_Lexer_skipComments($this);
    else
        $this.$index = $lowExpectedIndex + 1 | 0;
    var$1 = var$1.data;
    var$3 = $this.$prevNW;
    $high = var$1[var$3];
    if (($high & 64512) != 55296 ? 0 : 1) {
        $lowExpectedIndex = var$3 + 1 | 0;
        var$1 = $this.$pattern1.data;
        if ($lowExpectedIndex < var$1.length) {
            $low = var$1[$lowExpectedIndex];
            if (($low & 64512) != 56320 ? 0 : 1) {
                var$3 = $this.$index;
                $this.$prevNW = var$3;
                if ($this.$flags0 & 4)
                    jur_Lexer_skipComments($this);
                else
                    $this.$index = var$3 + 1 | 0;
                return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
            }
        }
    }
    return $high;
}
function jur_Lexer_getIndex($this) {
    return $this.$curToc;
}
function jur_PatternSyntaxException() {
    var a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern = null;
    a.$index0 = 0;
}
function jur_PatternSyntaxException__init_(var_0, var_1, var_2) {
    var var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_PatternSyntaxException__init_0($this, $description, $pattern, $index) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$index0 = (-1);
    $this.$desc = $description;
    $this.$pattern = $pattern;
    $this.$index0 = $index;
}
var jur_NonCapFSet = $rt_classWithoutFields(jur_FSet);
function jur_NonCapFSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $gr, var$5;
    $gr = $this.$groupIndex;
    var$5 = $matchResult.$consumers.data;
    var$5[$gr] = $stringIndex - var$5[$gr] | 0;
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_NonCapFSet_hasConsumed($this, $mr) {
    return 0;
}
var jur_AheadFSet = $rt_classWithoutFields(jur_FSet);
function jur_AheadFSet_matches($this, $stringIndex, $testString, $matchResult) {
    return $stringIndex;
}
var jur_BehindFSet = $rt_classWithoutFields(jur_FSet);
function jur_BehindFSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $gr;
    $gr = $this.$groupIndex;
    if ($matchResult.$consumers.data[$gr] != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
}
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index2 = 0;
}
function jur_AtomicFSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $gr, var$5;
    $gr = $this.$groupIndex;
    var$5 = $matchResult.$consumers.data;
    var$5[$gr] = $stringIndex - var$5[$gr] | 0;
    $this.$index2 = $stringIndex;
    return $stringIndex;
}
function jur_AtomicFSet_hasConsumed($this, $mr) {
    return 0;
}
var jur_FinalSet = $rt_classWithoutFields(jur_FSet);
function jur_FinalSet_matches($this, $stringIndex, $testString, $matchResult) {
    if ($matchResult.$mode0 != 1 && $stringIndex != $matchResult.$rightBound)
        return (-1);
    $matchResult.$valid = 1;
    $matchResult.$groupBounds.data[1] = $stringIndex;
    return $stringIndex;
}
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount = 0;
}
function jur_LeafSet__init_0($this, $next) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$next0 = $next;
    $this.$charCount = 1;
    $this.$type = 1;
}
function jur_LeafSet__init_($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
    $this.$charCount = 1;
}
function jur_LeafSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift;
    if (($stringIndex + $this.$charCount0() | 0) > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $shift = $this.$accepts($stringIndex, $testString);
    if ($shift < 0)
        return (-1);
    return $this.$next0.$matches($stringIndex + $shift | 0, $testString, $matchResult);
}
function jur_LeafSet_charCount($this) {
    return $this.$charCount;
}
function jur_LeafSet_hasConsumed($this, $mr) {
    return 1;
}
var jur_EmptySet = $rt_classWithoutFields(jur_LeafSet);
function jur_EmptySet__init_(var_0) {
    var var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
}
function jur_EmptySet__init_0($this, $next) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$next0 = $next;
    $this.$charCount = 1;
    $this.$type = 1;
    $this.$charCount = 0;
}
function jur_EmptySet_accepts($this, $stringIndex, $testString) {
    return 0;
}
function jur_EmptySet_find($this, $stringIndex, $testString, $matchResult) {
    var $strLength, $startStr, $low, var$7, $high;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    a: {
        b: {
            while (true) {
                $low = $rt_compare($stringIndex, $strLength);
                if ($low > 0)
                    return (-1);
                if ($low < 0) {
                    if ($stringIndex < 0)
                        break b;
                    var$7 = $testString.$characters.data;
                    $high = var$7.length;
                    if ($stringIndex >= $high)
                        break b;
                    if (((var$7[$stringIndex] & 64512) != 56320 ? 0 : 1) && $stringIndex > $startStr) {
                        $low = $stringIndex - 1 | 0;
                        if ($low < 0)
                            break a;
                        if ($low >= $high)
                            break a;
                        if ((var$7[$low] & 64512) != 55296 ? 0 : 1) {
                            $stringIndex = $stringIndex + 1 | 0;
                            continue;
                        }
                    }
                }
                if ($this.$next0.$matches($stringIndex, $testString, $matchResult) >= 0)
                    break;
                $stringIndex = $stringIndex + 1 | 0;
            }
            return $stringIndex;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_EmptySet_findBack($this, $stringIndex, $startSearch, $testString, $matchResult) {
    var $strLength, $startStr, var$7, var$8, $low;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    a: {
        b: {
            while (true) {
                if ($startSearch < $stringIndex)
                    return (-1);
                if ($startSearch < $strLength) {
                    if ($startSearch < 0)
                        break b;
                    var$7 = $testString.$characters.data;
                    var$8 = var$7.length;
                    if ($startSearch >= var$8)
                        break b;
                    if (((var$7[$startSearch] & 64512) != 56320 ? 0 : 1) && $startSearch > $startStr) {
                        $low = $startSearch - 1 | 0;
                        if ($low < 0)
                            break a;
                        if ($low >= var$8)
                            break a;
                        if ((var$7[$low] & 64512) != 55296 ? 0 : 1) {
                            $startSearch = $startSearch + (-1) | 0;
                            continue;
                        }
                    }
                }
                if ($this.$next0.$matches($startSearch, $testString, $matchResult) >= 0)
                    break;
                $startSearch = $startSearch + (-1) | 0;
            }
            return $startSearch;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_EmptySet_hasConsumed($this, $mr) {
    return 0;
}
function jur_JointSet() {
    var a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex0 = 0;
}
function jur_JointSet__init_(var_0, var_1) {
    var var_2 = new jur_JointSet();
    jur_JointSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_JointSet__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_JointSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $e, $size, var$6, $shift, $start, $i;
    $e = $this.$children;
    if ($e === null)
        return (-1);
    $size = $this.$groupIndex0;
    var$6 = $matchResult.$groupBounds.data;
    $shift = $size * 2 | 0;
    $start = var$6[$shift];
    var$6[$shift] = $stringIndex;
    $size = $e.$size;
    $i = 0;
    a: {
        while (true) {
            if ($i >= $size) {
                $stringIndex = $this.$groupIndex0;
                $matchResult.$groupBounds.data[$stringIndex * 2 | 0] = $start;
                return (-1);
            }
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            $shift = $e.$array.data[$i].$matches($stringIndex, $testString, $matchResult);
            if ($shift >= 0)
                break;
            $i = $i + 1 | 0;
        }
        return $shift;
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_JointSet_setNext($this, $next) {
    $this.$fSet.$next0 = $next;
}
function jur_JointSet_first($this, $set) {
    var var$2, $i$index, var$4, var$5, $i$index_0;
    a: {
        b: {
            var$2 = $this.$children;
            if (var$2 !== null) {
                $i$index = 0;
                var$4 = var$2.$modCount;
                var$5 = var$2.$size;
                while (true) {
                    if (!($i$index >= var$5 ? 0 : 1))
                        break b;
                    if (var$4 < var$2.$modCount) {
                        $set = new ju_ConcurrentModificationException;
                        $set.$suppressionEnabled = 1;
                        $set.$writableStackTrace = 1;
                        $rt_throw($set);
                    }
                    $i$index_0 = $i$index + 1 | 0;
                    if ($i$index < 0)
                        break a;
                    if ($i$index >= var$2.$size)
                        break a;
                    if (var$2.$array.data[$i$index].$first($set))
                        break;
                    $i$index = $i$index_0;
                }
                return 1;
            }
        }
        return 0;
    }
    $set = new jl_IndexOutOfBoundsException;
    $set.$suppressionEnabled = 1;
    $set.$writableStackTrace = 1;
    $rt_throw($set);
}
function jur_JointSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, var$4;
    var$2 = $this.$groupIndex0;
    var$3 = $matchResult.$groupBounds.data;
    var$2 = var$2 * 2 | 0;
    var$4 = var$2 + 1 | 0;
    return var$3[var$4] >= 0 && var$3[var$2] == var$3[var$4] ? 0 : 1;
}
function jur_JointSet_processSecondPass($this) {
    var $child, $childrenSize, $i, $set;
    $this.$isSecondPassVisited = 1;
    $child = $this.$fSet;
    if ($child !== null && !$child.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($child);
    a: {
        b: {
            $child = $this.$children;
            if ($child !== null) {
                $childrenSize = $child.$size;
                $i = 0;
                while (true) {
                    if ($i >= $childrenSize)
                        break b;
                    $child = $this.$children;
                    if ($i < 0)
                        break a;
                    if ($i >= $child.$size)
                        break a;
                    $child = $child.$array.data[$i];
                    $set = $child.$processBackRefReplacement();
                    if ($set === null)
                        $set = $child;
                    else {
                        $child.$isSecondPassVisited = 1;
                        ju_ArrayList_remove($this.$children, $i);
                        ju_ArrayList_add0($this.$children, $i, $set);
                    }
                    if (!$set.$isSecondPassVisited)
                        $set.$processSecondPass();
                    $i = $i + 1 | 0;
                }
            }
        }
        if ($this.$next0 !== null)
            jur_AbstractSet_processSecondPass($this);
        return;
    }
    $child = new jl_IndexOutOfBoundsException;
    $child.$suppressionEnabled = 1;
    $child.$writableStackTrace = 1;
    $rt_throw($child);
}
var jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet);
function jur_NonCapJointSet__init_(var_0, var_1) {
    var var_2 = new jur_NonCapJointSet();
    jur_NonCapJointSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_NonCapJointSet__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_NonCapJointSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $i, var$5, $start, $size, $e, $shift;
    $i = $this.$groupIndex0;
    var$5 = $matchResult.$consumers.data;
    $start = var$5[$i];
    var$5[$i] = $stringIndex;
    $size = $this.$children.$size;
    $i = 0;
    a: {
        while (true) {
            if ($i >= $size) {
                $stringIndex = $this.$groupIndex0;
                $matchResult.$consumers.data[$stringIndex] = $start;
                return (-1);
            }
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            $shift = $e.$array.data[$i].$matches($stringIndex, $testString, $matchResult);
            if ($shift >= 0)
                break;
            $i = $i + 1 | 0;
        }
        return $shift;
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_NonCapJointSet_hasConsumed($this, $matchResult) {
    var $cons;
    $cons = $this.$groupIndex0;
    return !$matchResult.$consumers.data[$cons] ? 0 : 1;
}
var jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet);
function jur_AtomicJointSet__init_(var_0, var_1) {
    var var_2 = new jur_AtomicJointSet();
    jur_AtomicJointSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_AtomicJointSet__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_AtomicJointSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift, var$5, $start, $size, $i, $e;
    $shift = $this.$groupIndex0;
    var$5 = $matchResult.$consumers.data;
    $start = var$5[$shift];
    var$5[$shift] = $stringIndex;
    $size = $this.$children.$size;
    $i = 0;
    a: {
        while ($i < $size) {
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            if ($e.$array.data[$i].$matches($stringIndex, $testString, $matchResult) >= 0)
                return $this.$next0.$matches($this.$fSet.$index2, $testString, $matchResult);
            $i = $i + 1 | 0;
        }
        $stringIndex = $this.$groupIndex0;
        $matchResult.$consumers.data[$stringIndex] = $start;
        return (-1);
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_AtomicJointSet_setNext($this, $next) {
    $this.$next0 = $next;
}
var jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet);
function jur_PositiveLookAhead__init_(var_0, var_1) {
    var var_2 = new jur_PositiveLookAhead();
    jur_PositiveLookAhead__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_PositiveLookAhead__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$4);
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_PositiveLookAhead_matches($this, $stringIndex, $testString, $matchResult) {
    var $size, $i, $e;
    $size = $this.$children.$size;
    $i = 0;
    a: {
        while ($i < $size) {
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            if ($e.$array.data[$i].$matches($stringIndex, $testString, $matchResult) >= 0)
                return $this.$next0.$matches($stringIndex, $testString, $matchResult);
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_PositiveLookAhead_hasConsumed($this, $matchResult) {
    return 0;
}
var jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet);
function jur_NegativeLookAhead__init_(var_0, var_1) {
    var var_2 = new jur_NegativeLookAhead();
    jur_NegativeLookAhead__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_NegativeLookAhead__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$4);
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_NegativeLookAhead_matches($this, $stringIndex, $testString, $matchResult) {
    var $size, $i, $e;
    $size = $this.$children.$size;
    $i = 0;
    a: {
        while (true) {
            if ($i >= $size)
                return $this.$next0.$matches($stringIndex, $testString, $matchResult);
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            if ($e.$array.data[$i].$matches($stringIndex, $testString, $matchResult) >= 0)
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_NegativeLookAhead_hasConsumed($this, $matchResult) {
    return 0;
}
var jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet);
function jur_PositiveLookBehind__init_(var_0, var_1) {
    var var_2 = new jur_PositiveLookBehind();
    jur_PositiveLookBehind__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_PositiveLookBehind__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$4);
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_PositiveLookBehind_matches($this, $stringIndex, $testString, $matchResult) {
    var $size, $leftBound, $shift, $i, $e;
    $size = $this.$children.$size;
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    a: {
        b: {
            $shift = $this.$next0.$matches($stringIndex, $testString, $matchResult);
            if ($shift >= 0) {
                $i = $this.$groupIndex0;
                $matchResult.$consumers.data[$i] = $stringIndex;
                $i = 0;
                while (true) {
                    if ($i >= $size)
                        break b;
                    $e = $this.$children;
                    if ($i < 0)
                        break a;
                    if ($i >= $e.$size)
                        break a;
                    if ($e.$array.data[$i].$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                        $stringIndex = $this.$groupIndex0;
                        $matchResult.$consumers.data[$stringIndex] = (-1);
                        return $shift;
                    }
                    $i = $i + 1 | 0;
                }
            }
        }
        return (-1);
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_PositiveLookBehind_hasConsumed($this, $matchResult) {
    return 0;
}
var jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet);
function jur_NegativeLookBehind__init_(var_0, var_1) {
    var var_2 = new jur_NegativeLookBehind();
    jur_NegativeLookBehind__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_NegativeLookBehind__init_0($this, $children, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$4);
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_NegativeLookBehind_matches($this, $stringIndex, $testString, $matchResult) {
    var $size, $i, $e;
    $size = $this.$children.$size;
    $i = $this.$groupIndex0;
    $matchResult.$consumers.data[$i] = $stringIndex;
    $i = 0;
    a: {
        while (true) {
            if ($i >= $size)
                return $this.$next0.$matches($stringIndex, $testString, $matchResult);
            $e = $this.$children;
            if ($i < 0)
                break a;
            if ($i >= $e.$size)
                break a;
            if ($e.$array.data[$i].$findBack(0, $stringIndex, $testString, $matchResult) >= 0)
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    $testString = new jl_IndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_NegativeLookBehind_hasConsumed($this, $matchResult) {
    return 0;
}
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
function jur_SingleSet__init_(var_0, var_1) {
    var var_2 = new jur_SingleSet();
    jur_SingleSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_SingleSet__init_0($this, $child, $fSet) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex0 = $fSet.$groupIndex;
}
function jur_SingleSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift, var$5, $start;
    $shift = $this.$groupIndex0;
    var$5 = $matchResult.$groupBounds.data;
    $shift = $shift * 2 | 0;
    $start = var$5[$shift];
    var$5[$shift] = $stringIndex;
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    $shift = $this.$groupIndex0;
    $matchResult.$groupBounds.data[$shift * 2 | 0] = $start;
    return (-1);
}
function jur_SingleSet_find($this, $stringIndex, $testString, $matchResult) {
    var $res;
    $res = $this.$kid.$find0($stringIndex, $testString, $matchResult);
    if ($res >= 0) {
        $stringIndex = $this.$groupIndex0;
        $matchResult.$groupBounds.data[$stringIndex * 2 | 0] = $res;
    }
    return $res;
}
function jur_SingleSet_findBack($this, $stringIndex, $lastIndex, $testString, $matchResult) {
    var $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0) {
        $stringIndex = $this.$groupIndex0;
        $matchResult.$groupBounds.data[$stringIndex * 2 | 0] = $res;
    }
    return $res;
}
function jur_SingleSet_first($this, $set) {
    return $this.$kid.$first($set);
}
function jur_SingleSet_processBackRefReplacement($this) {
    var $set, var$2, var$3, var$4, var$5;
    $set = new jur_BackReferencedSingleSet;
    var$2 = $this.$kid;
    var$3 = $this.$fSet;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$5);
    var$5.$buffer = $rt_createCharArray(20);
    $set.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $set.$kid = var$2;
    $set.$fSet = var$3;
    $set.$groupIndex0 = var$3.$groupIndex;
    $this.$next0 = $set;
    return $set;
}
function jur_SingleSet_processSecondPass($this) {
    var $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$fSet;
    if ($set !== null && !$set.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($set);
    $set = $this.$kid;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
}
var jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException);
var jur_SpecialToken = $rt_classWithoutFields();
function jur_AbstractCharClass() {
    var a = this; jur_SpecialToken.call(a);
    a.$alt0 = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints = 0;
}
var jur_AbstractCharClass_charClasses = null;
function jur_AbstractCharClass_getBits($this) {
    return null;
}
function jur_AbstractCharClass_getLowHighSurrogates($this) {
    return $this.$lowHighSurrogates;
}
function jur_AbstractCharClass_hasLowHighSurrogates($this) {
    return !$this.$altSurrogates ? (ju_BitSet_nextSetBit($this.$lowHighSurrogates, 0) >= 2048 ? 0 : 1) : ju_BitSet_nextClearBit($this.$lowHighSurrogates, 0) >= 2048 ? 0 : 1;
}
function jur_AbstractCharClass_mayContainSupplCodepoints($this) {
    return $this.$mayContainSupplCodepoints;
}
function jur_AbstractCharClass_getInstance($this) {
    return $this;
}
function jur_AbstractCharClass_getSurrogates($this) {
    var $lHS, var$2;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$1;
        var$2.$this$0 = $this;
        var$2.$val$lHS = $lHS;
        $lHS = new ju_BitSet;
        $lHS.$data0 = $rt_createIntArray(64);
        var$2.$lowHighSurrogates = $lHS;
        $this.$charClassWithSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
}
function jur_AbstractCharClass_getWithoutSurrogates($this) {
    var $lHS, var$2;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$2;
        var$2.$this$00 = $this;
        var$2.$val$lHS0 = $lHS;
        var$2.$val$thisClass = $this;
        $lHS = new ju_BitSet;
        $lHS.$data0 = $rt_createIntArray(64);
        var$2.$lowHighSurrogates = $lHS;
        $this.$charClassWithoutSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$alt0);
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints;
    }
    return $this.$charClassWithoutSurrogates;
}
function jur_AbstractCharClass_hasUCI($this) {
    return 0;
}
function jur_AbstractCharClass_setNegative($this, $value) {
    var var$2;
    var$2 = $this.$alt0;
    if (var$2 ^ $value) {
        $this.$alt0 = var$2 ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    return $this;
}
function jur_AbstractCharClass_isNegative($this) {
    return $this.$alt0;
}
function jur_AbstractCharClass_getPredefinedClass($name, $negative) {
    $name = jur_AbstractCharClass$PredefinedCharacterClasses_getObject(jur_AbstractCharClass_charClasses, $name);
    if (!$negative && $name.$posValue === null)
        $name.$posValue = $name.$computeValue();
    else if ($negative && $name.$negValue === null)
        $name.$negValue = jur_AbstractCharClass_setNegative($name.$computeValue(), 1);
    return $negative ? $name.$negValue : $name.$posValue;
}
function jur_AbstractCharClass__clinit_() {
    jur_AbstractCharClass_charClasses = new jur_AbstractCharClass$PredefinedCharacterClasses;
}
function jur_CharClass() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
function jur_CharClass_add($this, $ch) {
    var var$2;
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    ju_BitSet_clear($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                ju_BitSet_set($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = (String.fromCharCode((String.fromCharCode($ch)).toUpperCase().charCodeAt(0))).toLowerCase().charCodeAt(0);
            }
        }
    }
    var$2 = $ch <= 56319 && $ch >= 55296 ? 1 : 0;
    if (!(!var$2 && !($ch <= 57343 && $ch >= 56320 ? 1 : 0))) {
        if ($this.$invertedSurrogates)
            ju_BitSet_clear($this.$lowHighSurrogates, $ch - 55296 | 0);
        else
            ju_BitSet_set($this.$lowHighSurrogates, $ch - 55296 | 0);
    }
    if ($this.$inverted)
        ju_BitSet_clear($this.$bits, $ch);
    else
        ju_BitSet_set($this.$bits, $ch);
    if (!$this.$mayContainSupplCodepoints && ($ch >= 65536 && $ch <= 1114111 ? 1 : 0))
        $this.$mayContainSupplCodepoints = 1;
    return $this;
}
function jur_CharClass_add1($this, $cc) {
    var $curAlt, $nb, var$4;
    if (!$this.$mayContainSupplCodepoints && $cc.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            ju_BitSet_andNot($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        else
            ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        ju_BitSet_or($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$alt0)
                ju_BitSet_andNot($this.$bits, $cc.$getBits());
            else
                ju_BitSet_and($this.$bits, $cc.$getBits());
        } else if (!$cc.$alt0)
            ju_BitSet_or($this.$bits, $cc.$getBits());
        else {
            ju_BitSet_xor($this.$bits, $cc.$getBits());
            ju_BitSet_and($this.$bits, $cc.$getBits());
            $this.$alt0 = $this.$alt0 ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt0;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$4 = new jur_CharClass$5;
                var$4.$this$01 = $this;
                var$4.$val$curAlt = $curAlt;
                var$4.$val$nb = $nb;
                var$4.$val$cc = $cc;
                $cc = new ju_BitSet;
                $cc.$data0 = $rt_createIntArray(64);
                var$4.$lowHighSurrogates = $cc;
                $this.$nonBitSet = var$4;
            } else {
                var$4 = new jur_CharClass$4;
                var$4.$this$02 = $this;
                var$4.$val$curAlt0 = $curAlt;
                var$4.$val$nb0 = $nb;
                var$4.$val$cc0 = $cc;
                $cc = new ju_BitSet;
                $cc.$data0 = $rt_createIntArray(64);
                var$4.$lowHighSurrogates = $cc;
                $this.$nonBitSet = var$4;
            }
        } else {
            if ($curAlt && !$this.$inverted && ($this.$bits.$length2 ? 0 : 1)) {
                $nb = new jur_CharClass$1;
                $nb.$this$03 = $this;
                $nb.$val$cc1 = $cc;
                $cc = new ju_BitSet;
                $cc.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $cc;
                $this.$nonBitSet = $nb;
            } else if (!$curAlt) {
                $nb = new jur_CharClass$3;
                $nb.$this$04 = $this;
                $nb.$val$curAlt1 = $curAlt;
                $nb.$val$cc2 = $cc;
                $cc = new ju_BitSet;
                $cc.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $cc;
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$2;
                $nb.$this$05 = $this;
                $nb.$val$curAlt2 = $curAlt;
                $nb.$val$cc3 = $cc;
                $cc = new ju_BitSet;
                $cc.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $cc;
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
    return $this;
}
function jur_CharClass_add0($this, $i, $end) {
    var var$3;
    if ($i > $end) {
        var$3 = new jl_IllegalArgumentException;
        var$3.$suppressionEnabled = 1;
        var$3.$writableStackTrace = 1;
        $rt_throw(var$3);
    }
    a: {
        b: {
            if (!$this.$ci) {
                if ($end < 55296)
                    break b;
                if ($i > 57343)
                    break b;
            }
            $end = $end + 1 | 0;
            while (true) {
                if ($i >= $end)
                    break a;
                jur_CharClass_add($this, $i);
                $i = $i + 1 | 0;
            }
        }
        if ($this.$inverted)
            ju_BitSet_clear0($this.$bits, $i, $end + 1 | 0);
        else
            ju_BitSet_set0($this.$bits, $i, $end + 1 | 0);
    }
    return $this;
}
function jur_CharClass_union($this, $clazz) {
    var $curAlt, var$3, $nb, var$5;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($clazz.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_or($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        else
            ju_BitSet_and($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
    } else if ($curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        $this.$altSurrogates = 1;
    }
    a: {
        if (!$this.$hideBits) {
            var$3 = $clazz.$hideBits;
            if ((!var$3 ? $clazz.$bits : null) !== null) {
                $curAlt = $this.$alt0;
                if (!($curAlt ^ $clazz.$alt0)) {
                    if (!$curAlt) {
                        ju_BitSet_or($this.$bits, !var$3 ? $clazz.$bits : null);
                        break a;
                    }
                    ju_BitSet_and($this.$bits, !var$3 ? $clazz.$bits : null);
                    break a;
                }
                if ($curAlt) {
                    ju_BitSet_andNot($this.$bits, !var$3 ? $clazz.$bits : null);
                    break a;
                }
                ju_BitSet_xor($this.$bits, !var$3 ? $clazz.$bits : null);
                ju_BitSet_and($this.$bits, !$clazz.$hideBits ? $clazz.$bits : null);
                $this.$alt0 = 1;
                break a;
            }
        }
        $curAlt = $this.$alt0;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$5 = new jur_CharClass$11;
                var$5.$this$06 = $this;
                var$5.$val$curAlt3 = $curAlt;
                var$5.$val$nb1 = $nb;
                var$5.$val$clazz = $clazz;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                var$5.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = var$5;
            } else {
                var$5 = new jur_CharClass$10;
                var$5.$this$07 = $this;
                var$5.$val$curAlt4 = $curAlt;
                var$5.$val$nb2 = $nb;
                var$5.$val$clazz0 = $clazz;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                var$5.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = var$5;
            }
        } else {
            if (!$this.$inverted && ($this.$bits.$length2 ? 0 : 1)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$7;
                    $nb.$this$08 = $this;
                    $nb.$val$clazz1 = $clazz;
                    $clazz = new ju_BitSet;
                    $clazz.$data0 = $rt_createIntArray(64);
                    $nb.$lowHighSurrogates = $clazz;
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$6;
                    $nb.$this$09 = $this;
                    $nb.$val$clazz2 = $clazz;
                    $clazz = new ju_BitSet;
                    $clazz.$data0 = $rt_createIntArray(64);
                    $nb.$lowHighSurrogates = $clazz;
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$9;
                $nb.$this$010 = $this;
                $nb.$val$clazz3 = $clazz;
                $nb.$val$curAlt5 = $curAlt;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$8;
                $nb.$this$011 = $this;
                $nb.$val$clazz4 = $clazz;
                $nb.$val$curAlt6 = $curAlt;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
}
function jur_CharClass_intersection($this, $clazz) {
    var $curAlt, var$3, $nb, var$5;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($clazz.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_and($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        else
            ju_BitSet_or($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
    } else if (!$curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, $clazz.$lowHighSurrogates);
        $this.$altSurrogates = 0;
    }
    a: {
        if (!$this.$hideBits) {
            var$3 = $clazz.$hideBits;
            if ((!var$3 ? $clazz.$bits : null) !== null) {
                $curAlt = $this.$alt0;
                if (!($curAlt ^ $clazz.$alt0)) {
                    if (!$curAlt) {
                        ju_BitSet_and($this.$bits, !var$3 ? $clazz.$bits : null);
                        break a;
                    }
                    ju_BitSet_or($this.$bits, !var$3 ? $clazz.$bits : null);
                    break a;
                }
                if (!$curAlt) {
                    ju_BitSet_andNot($this.$bits, !var$3 ? $clazz.$bits : null);
                    break a;
                }
                ju_BitSet_xor($this.$bits, !var$3 ? $clazz.$bits : null);
                ju_BitSet_and($this.$bits, !$clazz.$hideBits ? $clazz.$bits : null);
                $this.$alt0 = 0;
                break a;
            }
        }
        $curAlt = $this.$alt0;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$5 = new jur_CharClass$17;
                var$5.$this$012 = $this;
                var$5.$val$curAlt7 = $curAlt;
                var$5.$val$nb3 = $nb;
                var$5.$val$clazz5 = $clazz;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                var$5.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = var$5;
            } else {
                var$5 = new jur_CharClass$16;
                var$5.$this$013 = $this;
                var$5.$val$curAlt8 = $curAlt;
                var$5.$val$nb4 = $nb;
                var$5.$val$clazz6 = $clazz;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                var$5.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = var$5;
            }
        } else {
            if (!$this.$inverted && ($this.$bits.$length2 ? 0 : 1)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$13;
                    $nb.$this$014 = $this;
                    $nb.$val$clazz7 = $clazz;
                    $clazz = new ju_BitSet;
                    $clazz.$data0 = $rt_createIntArray(64);
                    $nb.$lowHighSurrogates = $clazz;
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$12;
                    $nb.$this$015 = $this;
                    $nb.$val$clazz8 = $clazz;
                    $clazz = new ju_BitSet;
                    $clazz.$data0 = $rt_createIntArray(64);
                    $nb.$lowHighSurrogates = $clazz;
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$15;
                $nb.$this$016 = $this;
                $nb.$val$clazz9 = $clazz;
                $nb.$val$curAlt9 = $curAlt;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$14;
                $nb.$this$017 = $this;
                $nb.$val$clazz10 = $clazz;
                $nb.$val$curAlt10 = $curAlt;
                $clazz = new ju_BitSet;
                $clazz.$data0 = $rt_createIntArray(64);
                $nb.$lowHighSurrogates = $clazz;
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
}
function jur_CharClass_contains($this, $ch) {
    var var$2, var$3, var$4, var$5;
    var$2 = $this.$nonBitSet;
    if (var$2 !== null)
        return $this.$alt0 ^ var$2.$contains($ch);
    var$3 = $this.$alt0;
    var$2 = $this.$bits;
    var$4 = $ch / 32 | 0;
    var$5 = var$2.$data0.data;
    return var$3 ^ (var$4 < var$5.length && var$5[var$4] & 1 << ($ch % 32 | 0) ? 1 : 0);
}
function jur_CharClass_getBits($this) {
    if (!$this.$hideBits)
        return $this.$bits;
    return null;
}
function jur_CharClass_getLowHighSurrogates($this) {
    return $this.$lowHighSurrogates;
}
function jur_CharClass_getInstance($this) {
    var $bs, $res;
    if ($this.$nonBitSet !== null)
        return $this;
    $bs = !$this.$hideBits ? $this.$bits : null;
    $res = new jur_CharClass$18;
    $res.$this$018 = $this;
    $res.$val$bs = $bs;
    $bs = new ju_BitSet;
    $bs.$data0 = $rt_createIntArray(64);
    $res.$lowHighSurrogates = $bs;
    return jur_AbstractCharClass_setNegative($res, $this.$alt0);
}
function jur_CharClass_toString($this) {
    var $temp, $i, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    $temp = new jl_StringBuilder;
    $temp.$buffer = $rt_createCharArray(16);
    $i = ju_BitSet_nextSetBit($this.$bits, 0);
    while ($i >= 0) {
        if ($i < 65536) {
            var$3 = $rt_createCharArray(1);
            var$3.data[0] = $i & 65535;
        } else
            var$3 = $rt_createCharArrayFromData([(55296 | ($i - 65536 | 0) >> 10 & 1023) & 65535, (56320 | $i & 1023) & 65535]);
        var$4 = var$3.data;
        var$5 = 0;
        var$6 = var$4.length;
        var$7 = $temp.$length;
        jl_AbstractStringBuilder_insertSpace($temp, var$7, var$7 + var$6 | 0);
        var$6 = var$6 + var$5 | 0;
        while (var$5 < var$6) {
            var$3 = $temp.$buffer.data;
            var$8 = var$7 + 1 | 0;
            var$9 = var$5 + 1 | 0;
            var$3[var$7] = var$4[var$5];
            var$7 = var$8;
            var$5 = var$9;
        }
        var$6 = $temp.$length;
        jl_AbstractStringBuilder_insertSpace($temp, var$6, var$6 + 1 | 0);
        $temp.$buffer.data[var$6] = 124;
        $i = ju_BitSet_nextSetBit($this.$bits, $i + 1 | 0);
    }
    var$7 = $temp.$length;
    if (var$7 > 0)
        jl_AbstractStringBuilder_deleteCharAt($temp, var$7 - 1 | 0);
    var$10 = new jl_String;
    var$3 = $temp.$buffer;
    var$7 = $temp.$length;
    var$4 = $rt_createCharArray(var$7);
    var$11 = var$4.data;
    var$10.$characters = var$4;
    var$9 = 0;
    while (var$9 < var$7) {
        var$11[var$9] = var$3.data[var$9 + 0 | 0];
        var$9 = var$9 + 1 | 0;
    }
    return var$10;
}
function jur_CharClass_hasUCI($this) {
    return $this.$hasUCI0;
}
function ju_MissingResourceException() {
    var a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key = null;
}
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
function jur_QuantifierSet_getInnerSet($this) {
    return $this.$innerSet;
}
function jur_QuantifierSet_first($this, $set) {
    return !$this.$innerSet.$first($set) && !$this.$next0.$first($set) ? 0 : 1;
}
function jur_QuantifierSet_hasConsumed($this, $mr) {
    return 1;
}
function jur_QuantifierSet_processSecondPass($this) {
    var $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next0;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next0.$isSecondPassVisited = 1;
            $this.$next0 = $set;
        }
        $this.$next0.$processSecondPass();
    }
    $set = $this.$innerSet;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$innerSet = $set.$next0;
    }
}
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
function jur_LeafQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_LeafQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_LeafQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $i, var$5;
    $i = 0;
    a: {
        while (($stringIndex + $this.$leaf.$charCount0() | 0) <= $matchResult.$rightBound) {
            var$5 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$5 <= 0)
                break a;
            $stringIndex = $stringIndex + var$5 | 0;
            $i = $i + 1 | 0;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next0.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount0() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
}
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier0 = null;
}
function jur_CompositeQuantifierSet__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jur_CompositeQuantifierSet__init_0($this, $quant, $innerSet, $next, $type) {
    var var$5, var$6;
    var$5 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$5 + 1 | 0;
    var$6 = new jl_AbstractStringBuilder;
    var$6.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
    $this.$quantifier0 = $quant;
}
function jur_CompositeQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min;
    $max = var$4.$max;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while ($i < $max) {
                    if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break a;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next0.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount0() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
}
var jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet);
function jur_GroupQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_GroupQuantifierSet();
    jur_GroupQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_GroupQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
}
function jur_GroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet);
function jur_AltQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_AltQuantifierSet();
    jur_AltQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_AltQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_AltQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next0.$matches($stringIndex, $testString, $matchResult);
    return $shift;
}
function jur_AltQuantifierSet_setNext($this, $next) {
    $this.$next0 = $next;
    $this.$innerSet.$setNext($next);
}
var jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet);
function jur_UnifiedQuantifierSet__init_(var_0) {
    var var_1 = new jur_UnifiedQuantifierSet();
    jur_UnifiedQuantifierSet__init_0(var_1, var_0);
    return var_1;
}
function jur_UnifiedQuantifierSet__init_0($this, $quant) {
    var var$2, var$3, var$4, var$5;
    var$2 = $quant.$innerSet;
    var$3 = $quant.$next0;
    var$4 = $quant.$type;
    var$5 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$5 + 1 | 0;
    $quant = new jl_AbstractStringBuilder;
    $quant.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0($quant, $quant.$length, var$5, 10)).$toString();
    $this.$next0 = var$3;
    $this.$innerSet = var$2;
    $this.$type = var$4;
    $this.$leaf = var$2;
    var$2.$setNext($this);
}
function jur_UnifiedQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    while (($stringIndex + $this.$leaf.$charCount0() | 0) <= $matchResult.$rightBound && $this.$leaf.$accepts($stringIndex, $testString) > 0) {
        $stringIndex = $stringIndex + $this.$leaf.$charCount0() | 0;
    }
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_UnifiedQuantifierSet_find($this, $stringIndex, $testString, $matchResult) {
    var $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next0.$find0($stringIndex, $testString, $matchResult);
    if ($startSearch < 0)
        return (-1);
    $newSearch = $startSearch - $this.$leaf.$charCount0() | 0;
    while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
        $newSearch_0 = $newSearch - $this.$leaf.$charCount0() | 0;
        $startSearch = $newSearch;
        $newSearch = $newSearch_0;
    }
    return $startSearch;
}
function jur_AbstractCharClass$LazyCharClass() {
    var a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
function jur_AbstractCharClass$LazyCharClass_getValue($this, $negative) {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = jur_AbstractCharClass_setNegative($this.$computeValue(), 1);
    if ($negative)
        return $this.$negValue;
    return $this.$posValue;
}
var jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException);
function jl_NumberFormatException__init_0(var_0) {
    var var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_(var_1, var_0);
    return var_1;
}
function jl_NumberFormatException__init_($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
function jur_Quantifier() {
    var a = this; jur_SpecialToken.call(a);
    a.$min = 0;
    a.$max = 0;
}
function jur_Quantifier_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = new jl_StringBuilder;
    var$1.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(71));
    var$2 = $this.$min;
    jl_AbstractStringBuilder_insert0(var$1, var$1.$length, var$2, 10);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(72));
    var$3 = $this.$max;
    if (var$3 == 2147483647)
        var$4 = $rt_s(47);
    else {
        var$4 = new jl_AbstractStringBuilder;
        var$4.$buffer = $rt_createCharArray(20);
        var$4 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    }
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, var$4);
    jl_AbstractStringBuilder_insert(var$1, var$1.$length, $rt_s(73));
    var$4 = new jl_String;
    var$5 = var$1.$buffer;
    var$3 = var$1.$length;
    var$6 = $rt_createCharArray(var$3);
    var$7 = var$6.data;
    var$4.$characters = var$6;
    var$8 = 0;
    while (var$8 < var$3) {
        var$7[var$8] = var$5.data[var$8 + 0 | 0];
        var$8 = var$8 + 1 | 0;
    }
    return var$4;
}
var jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet);
function jur_FSet$PossessiveFSet_matches($this, $stringIndex, $testString, $matchResult) {
    return $stringIndex;
}
function jur_FSet$PossessiveFSet_hasConsumed($this, $mr) {
    return 0;
}
function ju_BitSet() {
    var a = this; jl_Object.call(a);
    a.$data0 = null;
    a.$length2 = 0;
}
function ju_BitSet_set($this, $bitIndex) {
    var $index, var$3;
    $index = $bitIndex / 32 | 0;
    if ($bitIndex >= $this.$length2) {
        ju_BitSet_ensureCapacity($this, $index + 1 | 0);
        $this.$length2 = $bitIndex + 1 | 0;
    }
    var$3 = $this.$data0.data;
    var$3[$index] = var$3[$index] | 1 << ($bitIndex % 32 | 0);
}
function ju_BitSet_set0($this, $fromIndex, $toIndex) {
    var var$3, $fromDataIndex, $toDataIndex, var$6, var$7, $i;
    if ($fromIndex > $toIndex) {
        var$3 = new jl_IndexOutOfBoundsException;
        var$3.$suppressionEnabled = 1;
        var$3.$writableStackTrace = 1;
        $rt_throw(var$3);
    }
    $fromDataIndex = $fromIndex / 32 | 0;
    $toDataIndex = $toIndex / 32 | 0;
    if ($toIndex > $this.$length2) {
        ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
        $this.$length2 = $toIndex;
    }
    if ($fromDataIndex == $toDataIndex) {
        var$6 = $this.$data0.data;
        $toDataIndex = var$6[$fromDataIndex];
        var$7 = (-1) << ($fromIndex % 32 | 0);
        $fromIndex = $toIndex % 32 | 0;
        var$6[$fromDataIndex] = $toDataIndex | var$7 & (!$fromIndex ? 0 : (-1) >>> (32 - $fromIndex | 0));
    } else {
        var$6 = $this.$data0.data;
        var$6[$fromDataIndex] = var$6[$fromDataIndex] | (-1) << ($fromIndex % 32 | 0);
        $i = $fromDataIndex + 1 | 0;
        while ($i < $toDataIndex) {
            var$6[$i] = (-1);
            $i = $i + 1 | 0;
        }
        if ($toIndex & 31) {
            $i = var$6[$toDataIndex];
            $fromIndex = $toIndex % 32 | 0;
            var$6[$toDataIndex] = $i | (!$fromIndex ? 0 : (-1) >>> (32 - $fromIndex | 0));
        }
    }
}
function ju_BitSet_clear($this, $bitIndex) {
    var $index, var$3, var$4, var$5;
    $index = $bitIndex / 32 | 0;
    var$3 = $this.$data0.data;
    if ($index < var$3.length) {
        var$4 = var$3[$index];
        var$5 = ($bitIndex % 32 | 0) & 31;
        var$3[$index] = var$4 & ((-2) << var$5 | (-2) >>> (32 - var$5 | 0));
        if ($bitIndex == ($this.$length2 - 1 | 0))
            ju_BitSet_recalculateLength($this);
    }
}
function ju_BitSet_clear0($this, $fromIndex, $toIndex) {
    var var$3, $fromDataIndex, $toDataIndex, var$6, $i, var$8;
    if ($fromIndex > $toIndex) {
        var$3 = new jl_IndexOutOfBoundsException;
        var$3.$suppressionEnabled = 1;
        var$3.$writableStackTrace = 1;
        $rt_throw(var$3);
    }
    $fromDataIndex = $this.$length2;
    if ($fromIndex >= $fromDataIndex)
        return;
    if ($fromDataIndex < $toIndex)
        $toIndex = $fromDataIndex;
    $fromDataIndex = $fromIndex / 32 | 0;
    $toDataIndex = $toIndex / 32 | 0;
    if ($fromDataIndex == $toDataIndex) {
        var$6 = $this.$data0.data;
        $i = var$6[$fromDataIndex];
        $fromIndex = $fromIndex % 32 | 0;
        var$6[$fromDataIndex] = $i & ((!$fromIndex ? 0 : (-1) >>> (32 - $fromIndex | 0)) | (-1) << ($toIndex % 32 | 0));
    } else {
        var$6 = $this.$data0.data;
        var$8 = var$6[$fromDataIndex];
        $fromIndex = $fromIndex % 32 | 0;
        var$6[$fromDataIndex] = var$8 & (!$fromIndex ? 0 : (-1) >>> (32 - $fromIndex | 0));
        $i = $fromDataIndex + 1 | 0;
        while ($i < $toDataIndex) {
            var$6[$i] = 0;
            $i = $i + 1 | 0;
        }
        if ($toIndex & 31)
            var$6[$toDataIndex] = var$6[$toDataIndex] & (-1) << ($toIndex % 32 | 0);
    }
    ju_BitSet_recalculateLength($this);
}
function ju_BitSet_nextSetBit($this, $fromIndex) {
    var $top, $index, var$4, $i;
    $top = $this.$length2;
    if ($fromIndex >= $top)
        return (-1);
    $index = $fromIndex / 32 | 0;
    var$4 = $this.$data0.data;
    $i = var$4[$index] >>> ($fromIndex % 32 | 0);
    if ($i)
        return jl_Integer_numberOfTrailingZeros($i) + $fromIndex | 0;
    $top = ($top + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if (var$4[$i])
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
}
function ju_BitSet_nextClearBit($this, $fromIndex) {
    var var$2, $index, var$4, $top, $i;
    var$2 = $this.$length2;
    if ($fromIndex >= var$2)
        return $fromIndex;
    $index = $fromIndex / 32 | 0;
    var$4 = $this.$data0.data;
    $top = (var$4[$index] ^ (-1)) >>> ($fromIndex % 32 | 0);
    if ($top)
        return jl_Integer_numberOfTrailingZeros($top) + $fromIndex | 0;
    $top = (var$2 + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if (var$4[$i] != (-1))
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[$i] ^ (-1)) | 0;
        $i = $i + 1 | 0;
    }
    return var$2;
}
function ju_BitSet_ensureCapacity($this, $capacity) {
    var var$2, var$3, $newArrayLength, $newArrayLength_0, var$6, var$7;
    var$2 = $this.$data0.data;
    var$3 = var$2.length;
    if (var$3 >= $capacity)
        return;
    $newArrayLength = ($capacity * 3 | 0) / 2 | 0;
    $newArrayLength_0 = (var$3 * 2 | 0) + 1 | 0;
    if ($newArrayLength > $newArrayLength_0)
        $newArrayLength_0 = $newArrayLength;
    var$6 = $rt_createIntArray($newArrayLength_0);
    if ($newArrayLength_0 < var$3)
        var$3 = $newArrayLength_0;
    var$7 = var$6.data;
    $capacity = 0;
    while ($capacity < var$3) {
        var$7[$capacity] = var$2[$capacity];
        $capacity = $capacity + 1 | 0;
    }
    $this.$data0 = var$6;
}
function ju_BitSet_recalculateLength($this) {
    var $top, $i, $sz;
    $top = ($this.$length2 + 31 | 0) / 32 | 0;
    $this.$length2 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data0.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length2 = $this.$length2 - 32 | 0;
        }
        $this.$length2 = $this.$length2 - $sz | 0;
    }
}
function ju_BitSet_intersects($this, $set) {
    var var$2, $sz, var$4, $sz_0, $i;
    var$2 = $this.$data0.data;
    $sz = var$2.length;
    var$4 = $set.$data0.data;
    $sz_0 = var$4.length;
    if ($sz < $sz_0)
        $sz_0 = $sz;
    $i = 0;
    while ($i < $sz_0) {
        if (var$2[$i] & var$4[$i])
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
}
function ju_BitSet_and($this, $set) {
    var var$2, var$3, var$4, $sz, $i, var$7, var$8;
    var$2 = $this.$data0.data;
    var$3 = var$2.length;
    var$4 = $set.$data0.data;
    $sz = var$4.length;
    if (var$3 < $sz)
        $sz = var$3;
    $i = 0;
    while ($i < $sz) {
        var$2[$i] = var$2[$i] & var$4[$i];
        $i = $i + 1 | 0;
    }
    while ($sz < var$3) {
        var$2[$sz] = 0;
        $sz = $sz + 1 | 0;
    }
    var$7 = $this.$length2;
    var$8 = $set.$length2;
    if (var$7 < var$8)
        var$8 = var$7;
    $this.$length2 = var$8;
    ju_BitSet_recalculateLength($this);
}
function ju_BitSet_andNot($this, $set) {
    var var$2, $sz, var$4, $sz_0, $i;
    var$2 = $this.$data0.data;
    $sz = var$2.length;
    var$4 = $set.$data0.data;
    $sz_0 = var$4.length;
    if ($sz < $sz_0)
        $sz_0 = $sz;
    $i = 0;
    while ($i < $sz_0) {
        var$2[$i] = var$2[$i] & (var$4[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
}
function ju_BitSet_or($this, $set) {
    var $sz, $sz_0, var$4, var$5, $i;
    $sz = $this.$length2;
    $sz_0 = $set.$length2;
    if ($sz > $sz_0)
        $sz_0 = $sz;
    $this.$length2 = $sz_0;
    ju_BitSet_ensureCapacity($this, ($sz_0 + 31 | 0) / 32 | 0);
    var$4 = $this.$data0.data;
    $sz = var$4.length;
    var$5 = $set.$data0.data;
    $sz_0 = var$5.length;
    if ($sz < $sz_0)
        $sz_0 = $sz;
    $i = 0;
    while ($i < $sz_0) {
        var$4[$i] = var$4[$i] | var$5[$i];
        $i = $i + 1 | 0;
    }
}
function ju_BitSet_xor($this, $set) {
    var $sz, $i, var$4, var$5, $sz_0;
    $sz = $this.$length2;
    $i = $set.$length2;
    if ($sz > $i)
        $i = $sz;
    $this.$length2 = $i;
    ju_BitSet_ensureCapacity($this, ($i + 31 | 0) / 32 | 0);
    var$4 = $this.$data0.data;
    $sz = var$4.length;
    var$5 = $set.$data0.data;
    $sz_0 = var$5.length;
    if ($sz < $sz_0)
        $sz_0 = $sz;
    $i = 0;
    while ($i < $sz_0) {
        var$4[$i] = var$4[$i] ^ var$5[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
}
function jur_LowHighSurrogateRangeSet() {
    var a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt = 0;
}
function jur_LowHighSurrogateRangeSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $startStr, $strLength, var$6, var$7, $ch, $low, $high;
    $startStr = $matchResult.$leftBound;
    $strLength = $matchResult.$rightBound;
    var$6 = $stringIndex + 1 | 0;
    $strLength = $rt_compare(var$6, $strLength);
    if ($strLength > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    if ($stringIndex >= 0) {
        var$7 = $testString.$characters.data;
        if ($stringIndex < var$7.length) {
            $ch = var$7[$stringIndex];
            if (!$this.$surrChars.$contains($ch))
                return (-1);
            $low = $ch & 64512;
            $high = $low != 55296 ? 0 : 1;
            a: {
                if ($high) {
                    if ($strLength >= 0)
                        break a;
                    if (var$6 >= 0) {
                        var$7 = $testString.$characters.data;
                        if (var$6 < var$7.length) {
                            if ((var$7[var$6] & 64512) != 56320 ? 0 : 1)
                                return (-1);
                            break a;
                        }
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
                if (($low != 56320 ? 0 : 1) && $stringIndex > $startStr) {
                    $high = $stringIndex - 1 | 0;
                    if ($high >= 0) {
                        var$7 = $testString.$characters.data;
                        if ($high < var$7.length) {
                            if (!((var$7[$high] & 64512) != 55296 ? 0 : 1))
                                break a;
                            return (-1);
                        }
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            return $this.$next0.$matches(var$6, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_CompositeRangeSet() {
    var a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
function jur_CompositeRangeSet__init_(var_0, var_1) {
    var var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_CompositeRangeSet__init_0($this, $withoutSurrogates, $withSurrogates) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
}
function jur_CompositeRangeSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = jur_LowHighSurrogateRangeSet_matches($this.$withSurrogates, $stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return (-1);
}
function jur_CompositeRangeSet_setNext($this, $next) {
    $this.$next0 = $next;
    $this.$withSurrogates.$next0 = $next;
    $this.$withoutSurrogates.$setNext($next);
}
function jur_CompositeRangeSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_CompositeRangeSet_first($this, $set) {
    return 1;
}
function jur_SupplRangeSet() {
    var a = this; jur_JointSet.call(a);
    a.$chars0 = null;
    a.$alt2 = 0;
}
function jur_SupplRangeSet__init_(var_0) {
    var var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_0(var_1, var_0);
    return var_1;
}
function jur_SupplRangeSet__init_0($this, $cc) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$chars0 = $cc.$getInstance1();
    $this.$alt2 = $cc.$alt0;
}
function jur_SupplRangeSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength, $low, var$6, $high, $offset;
    a: {
        $strLength = $matchResult.$rightBound;
        if ($stringIndex < $strLength) {
            $low = $stringIndex + 1 | 0;
            if ($stringIndex >= 0) {
                var$6 = $testString.$characters.data;
                if ($stringIndex < var$6.length) {
                    $high = var$6[$stringIndex];
                    if ($this.$contains($high)) {
                        $offset = $this.$next0.$matches($low, $testString, $matchResult);
                        if ($offset > 0)
                            return $offset;
                    }
                    if ($low >= $strLength)
                        break a;
                    $strLength = $low + 1 | 0;
                    if ($low >= 0) {
                        var$6 = $testString.$characters.data;
                        if ($low < var$6.length) {
                            $low = var$6[$low];
                            $stringIndex = ($high & 64512) != 55296 ? 0 : 1;
                            if (!($stringIndex && (($low & 64512) != 56320 ? 0 : 1) ? 1 : 0))
                                break a;
                            if (!$this.$contains((($high & 1023) << 10 | $low & 1023) + 65536 | 0))
                                break a;
                            else
                                return $this.$next0.$matches($strLength, $testString, $matchResult);
                        }
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    return (-1);
}
function jur_SupplRangeSet_contains($this, $ch) {
    return $this.$chars0.$contains($ch);
}
function jur_SupplRangeSet_first($this, $set) {
    var var$2, var$3;
    if ($set instanceof jur_SupplCharSet)
        return $this.$chars0.$contains($set.$ch4);
    if ($set instanceof jur_CharSet)
        return $this.$chars0.$contains($set.$ch0);
    if ($set instanceof jur_SupplRangeSet) {
        var$2 = $this.$chars0;
        $set = $set.$chars0;
        return var$2.$getBits() !== null && $set.$getBits() !== null ? ju_BitSet_intersects(var$2.$getBits(), $set.$getBits()) : 1;
    }
    if (!($set instanceof jur_RangeSet))
        return 1;
    var$2 = $this.$chars0;
    var$3 = $set.$chars1;
    return var$2.$getBits() !== null && var$3.$getBits() !== null ? ju_BitSet_intersects(var$2.$getBits(), var$3.$getBits()) : 1;
}
function jur_SupplRangeSet_getChars($this) {
    return $this.$chars0;
}
function jur_SupplRangeSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_SupplRangeSet_hasConsumed($this, $mr) {
    return 1;
}
var jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet);
function jur_UCISupplRangeSet_contains($this, $ch) {
    return $this.$chars0.$contains((String.fromCharCode((String.fromCharCode($ch)).toUpperCase().charCodeAt(0))).toLowerCase().charCodeAt(0));
}
function jur_UCIRangeSet() {
    var a = this; jur_LeafSet.call(a);
    a.$chars = null;
    a.$alt1 = 0;
}
function jur_UCIRangeSet__init_(var_0) {
    var var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_0(var_1, var_0);
    return var_1;
}
function jur_UCIRangeSet__init_0($this, $cc) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$chars = $cc.$getInstance1();
    $this.$alt1 = $cc.$alt0;
}
function jur_UCIRangeSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4;
    var$3 = $this.$chars;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        if ($strIndex < var$4.length)
            return !var$3.$contains((String.fromCharCode((String.fromCharCode(var$4[$strIndex])).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535) ? (-1) : 1;
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_RangeSet() {
    var a = this; jur_LeafSet.call(a);
    a.$chars1 = null;
    a.$alt3 = 0;
}
function jur_RangeSet__init_(var_0) {
    var var_1 = new jur_RangeSet();
    jur_RangeSet__init_0(var_1, var_0);
    return var_1;
}
function jur_RangeSet__init_0($this, $cc) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$chars1 = $cc.$getInstance1();
    $this.$alt3 = $cc.$alt0;
}
function jur_RangeSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4;
    var$3 = $this.$chars1;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        if ($strIndex < var$4.length)
            return !var$3.$contains(var$4[$strIndex]) ? (-1) : 1;
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_RangeSet_first($this, $set) {
    var var$2, var$3;
    if ($set instanceof jur_CharSet)
        return $this.$chars1.$contains($set.$ch0);
    if ($set instanceof jur_RangeSet) {
        var$2 = $this.$chars1;
        $set = $set.$chars1;
        return var$2.$getBits() !== null && $set.$getBits() !== null ? ju_BitSet_intersects(var$2.$getBits(), $set.$getBits()) : 1;
    }
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    var$2 = $this.$chars1;
    var$3 = $set.$chars0;
    return var$2.$getBits() !== null && var$3.$getBits() !== null ? ju_BitSet_intersects(var$2.$getBits(), var$3.$getBits()) : 1;
}
function jur_HangulDecomposedCharSet() {
    var a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
function jur_HangulDecomposedCharSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_HangulDecomposedCharSet_matches($this, $strIndex, $testString, $matchResult) {
    var $rightBound, $decompSyllable, $vIndex, $tIndex, var$8, $decompCurSymb, $curSymb, $i, $lIndex;
    $rightBound = $matchResult.$rightBound;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex >= $rightBound)
        return (-1);
    var$8 = $strIndex + 1 | 0;
    if ($strIndex >= 0) {
        $decompCurSymb = $testString.$characters.data;
        if ($strIndex < $decompCurSymb.length) {
            $curSymb = $decompCurSymb[$strIndex];
            $decompCurSymb = jur_Lexer_getHangulDecomposition($curSymb);
            if ($decompCurSymb !== null) {
                $decompCurSymb = $decompCurSymb.data;
                $i = 0;
                $strIndex = $decompCurSymb.length;
                $curSymb = $this.$decomposedCharLength;
                if ($strIndex != $curSymb)
                    return (-1);
                while (true) {
                    if ($i >= $curSymb)
                        return $this.$next0.$matches(var$8, $testString, $matchResult);
                    if ($decompCurSymb[$i] != $this.$decomposedChar.data[$i])
                        break;
                    $i = $i + 1 | 0;
                }
                return (-1);
            }
            $decompSyllable = $decompSyllable.data;
            $decompSyllable[0] = $curSymb;
            $lIndex = $curSymb - 4352 | 0;
            if ($lIndex >= 0 && $lIndex < 19) {
                a: {
                    if (var$8 < $rightBound) {
                        if (var$8 >= 0) {
                            $decompCurSymb = $testString.$characters.data;
                            if (var$8 < $decompCurSymb.length) {
                                $curSymb = $decompCurSymb[var$8];
                                $vIndex = $curSymb - 4449 | 0;
                                break a;
                            }
                        }
                        $testString = new jl_StringIndexOutOfBoundsException;
                        $testString.$suppressionEnabled = 1;
                        $testString.$writableStackTrace = 1;
                        $rt_throw($testString);
                    }
                }
                if ($vIndex >= 0 && $vIndex < 21) {
                    b: {
                        $strIndex = var$8 + 1 | 0;
                        $decompSyllable[1] = $curSymb;
                        if ($strIndex < $rightBound) {
                            if ($strIndex >= 0) {
                                $decompCurSymb = $testString.$characters.data;
                                if ($strIndex < $decompCurSymb.length) {
                                    $curSymb = $decompCurSymb[$strIndex];
                                    $tIndex = $curSymb - 4519 | 0;
                                    break b;
                                }
                            }
                            $testString = new jl_StringIndexOutOfBoundsException;
                            $testString.$suppressionEnabled = 1;
                            $testString.$writableStackTrace = 1;
                            $rt_throw($testString);
                        }
                    }
                    if ($tIndex >= 0 && $tIndex < 28) {
                        c: {
                            $strIndex = $strIndex + 1 | 0;
                            $decompSyllable[2] = $curSymb;
                            if ($this.$decomposedCharLength == 3) {
                                $curSymb = $decompSyllable[0];
                                $decompCurSymb = $this.$decomposedChar.data;
                                if ($curSymb == $decompCurSymb[0] && $decompSyllable[1] == $decompCurSymb[1] && $decompSyllable[2] == $decompCurSymb[2]) {
                                    $strIndex = $this.$next0.$matches($strIndex, $testString, $matchResult);
                                    break c;
                                }
                            }
                            $strIndex = (-1);
                        }
                        return $strIndex;
                    }
                    d: {
                        if ($this.$decomposedCharLength == 2) {
                            $curSymb = $decompSyllable[0];
                            $decompCurSymb = $this.$decomposedChar.data;
                            if ($curSymb == $decompCurSymb[0] && $decompSyllable[1] == $decompCurSymb[1]) {
                                $strIndex = $this.$next0.$matches($strIndex, $testString, $matchResult);
                                break d;
                            }
                        }
                        $strIndex = (-1);
                    }
                    return $strIndex;
                }
                return (-1);
            }
            return (-1);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_HangulDecomposedCharSet_first($this, $set) {
    var var$2, var$3, var$4, var$5, var$6, var$7;
    a: {
        if ($set instanceof jur_HangulDecomposedCharSet) {
            $set = $set;
            if ($set.$decomposedCharUTF16 === null) {
                var$2 = new jl_String;
                var$3 = $set.$decomposedChar.data;
                var$4 = var$3.length;
                var$5 = $rt_createCharArray(var$4);
                var$6 = var$5.data;
                var$2.$characters = var$5;
                var$7 = 0;
                while (var$7 < var$4) {
                    var$6[var$7] = var$3[var$7];
                    var$7 = var$7 + 1 | 0;
                }
                $set.$decomposedCharUTF16 = var$2;
            }
            var$2 = $set.$decomposedCharUTF16;
            if ($this.$decomposedCharUTF16 === null) {
                $set = new jl_String;
                var$3 = $this.$decomposedChar.data;
                var$4 = var$3.length;
                var$5 = $rt_createCharArray(var$4);
                var$6 = var$5.data;
                $set.$characters = var$5;
                var$7 = 0;
                while (var$7 < var$4) {
                    var$6[var$7] = var$3[var$7];
                    var$7 = var$7 + 1 | 0;
                }
                $this.$decomposedCharUTF16 = $set;
            }
            if (!jl_String_equals(var$2, $this.$decomposedCharUTF16)) {
                var$4 = 0;
                break a;
            }
        }
        var$4 = 1;
    }
    return var$4;
}
function jur_HangulDecomposedCharSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
function jur_CharSet__init_(var_0) {
    var var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_CharSet__init_0($this, $ch) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$ch0 = $ch;
}
function jur_CharSet_charCount($this) {
    return 1;
}
function jur_CharSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4;
    var$3 = $this.$ch0;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        if ($strIndex < var$4.length)
            return var$3 != var$4[$strIndex] ? (-1) : 1;
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_CharSet_find($this, $strIndex, $testStr, $matchResult) {
    var $strLength, var$5, var$6, var$7, var$8, var$9;
    if ($testStr instanceof jl_String) {
        $strLength = $matchResult.$rightBound;
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$5 = jl_String_indexOf($testStr, $this.$ch0, $strIndex);
            if (var$5 < 0)
                return (-1);
            var$6 = $this.$next0;
            $strIndex = var$5 + 1 | 0;
            if (var$6.$matches($strIndex, $testStr, $matchResult) >= 0)
                break;
        }
        return var$5;
    }
    var$7 = $matchResult.$rightBound;
    a: {
        b: {
            while (true) {
                if ($strIndex > var$7) {
                    $strIndex = (-1);
                    break b;
                }
                var$5 = $strIndex + 1 | 0;
                if (var$5 > $matchResult.$rightBound) {
                    $matchResult.$hitEnd = 1;
                    var$8 = (-1);
                } else {
                    var$8 = $this.$ch0;
                    if ($strIndex < 0)
                        break a;
                    var$9 = $testStr.$characters.data;
                    if ($strIndex >= var$9.length)
                        break a;
                    var$8 = var$8 != var$9[$strIndex] ? (-1) : 1;
                    var$8 = var$8 < 0 ? (-1) : $this.$next0.$matches($strIndex + var$8 | 0, $testStr, $matchResult);
                }
                if (var$8 >= 0)
                    break;
                $strIndex = var$5;
            }
        }
        return $strIndex;
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0($testStr);
    $rt_throw($testStr);
}
function jur_CharSet_findBack($this, $strIndex, $lastIndex, $testStr, $matchResult) {
    var var$5, var$6;
    if ($testStr instanceof jl_String) {
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                var$5 = jl_String_lastIndexOf($testStr, $this.$ch0, $lastIndex);
                if (var$5 < 0)
                    break a;
                if (var$5 < $strIndex)
                    break a;
                if ($this.$next0.$matches(var$5 + 1 | 0, $testStr, $matchResult) >= 0)
                    break;
                $lastIndex = var$5 + (-1) | 0;
            }
            return var$5;
        }
        return (-1);
    }
    b: {
        c: {
            while (true) {
                if ($lastIndex < $strIndex) {
                    $lastIndex = (-1);
                    break c;
                }
                if (($lastIndex + 1 | 0) > $matchResult.$rightBound) {
                    $matchResult.$hitEnd = 1;
                    var$5 = (-1);
                } else {
                    var$5 = $this.$ch0;
                    if ($lastIndex < 0)
                        break b;
                    var$6 = $testStr.$characters.data;
                    if ($lastIndex >= var$6.length)
                        break b;
                    var$5 = var$5 != var$6[$lastIndex] ? (-1) : 1;
                    var$5 = var$5 < 0 ? (-1) : $this.$next0.$matches($lastIndex + var$5 | 0, $testStr, $matchResult);
                }
                if (var$5 >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
        }
        return $lastIndex;
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0($testStr);
    $rt_throw($testStr);
}
function jur_CharSet_first($this, $set) {
    var var$2, var$3, var$4, var$5;
    if ($set instanceof jur_CharSet)
        return $set.$ch0 != $this.$ch0 ? 0 : 1;
    if (!($set instanceof jur_RangeSet)) {
        if ($set instanceof jur_SupplRangeSet)
            return $set.$contains($this.$ch0);
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    $set = $set;
    var$2 = $this.$ch0;
    var$3 = $rt_createCharArray(1).data;
    var$3[0] = var$2;
    var$2 = var$3.length;
    var$4 = $rt_createCharArray(var$2).data;
    var$5 = 0;
    while (var$5 < var$2) {
        var$4[var$5] = var$3[var$5];
        var$5 = var$5 + 1 | 0;
    }
    $set = $set.$chars1;
    if (0 >= var$4.length) {
        $set = new jl_StringIndexOutOfBoundsException;
        $set.$suppressionEnabled = 1;
        $set.$writableStackTrace = 1;
        $rt_throw($set);
    }
    return (!$set.$contains(var$4[0]) ? (-1) : 1) <= 0 ? 0 : 1;
}
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch3 = 0;
}
function jur_UCICharSet__init_(var_0) {
    var var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_UCICharSet__init_0($this, $ch) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$ch3 = (String.fromCharCode((String.fromCharCode($ch)).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535;
}
function jur_UCICharSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4;
    var$3 = $this.$ch3;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        if ($strIndex < var$4.length)
            return var$3 != ((String.fromCharCode((String.fromCharCode(var$4[$strIndex])).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535) ? (-1) : 1;
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_CICharSet() {
    var a = this; jur_LeafSet.call(a);
    a.$ch1 = 0;
    a.$supplement = 0;
}
function jur_CICharSet__init_(var_0) {
    var var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_CICharSet__init_0($this, $ch) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$ch1 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
}
function jur_CICharSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4, var$5;
    var$3 = $this.$ch1;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        var$5 = $rt_compare($strIndex, var$4.length);
        if (var$5 < 0) {
            a: {
                b: {
                    if (var$3 != var$4[$strIndex]) {
                        var$3 = $this.$supplement;
                        if ($strIndex < 0)
                            break a;
                        if (var$5 >= 0)
                            break a;
                        if (var$3 != var$4[$strIndex]) {
                            $strIndex = (-1);
                            break b;
                        }
                    }
                    $strIndex = 1;
                }
                return $strIndex;
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_DecomposedCharSet() {
    var a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
function jur_DecomposedCharSet__init_(var_0, var_1) {
    var var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_DecomposedCharSet__init_0($this, $decomposedChar, $decomposedCharLength) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
}
function jur_DecomposedCharSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_DecomposedCharSet_matches($this, $strIndex, $testString, $matchResult) {
    var $decCodePoint, $rightBound, $curChar, var$7, $decCurCodePoint, var$9, var$10;
    $decCodePoint = $rt_createIntArray(4);
    $rightBound = $matchResult.$rightBound;
    if ($strIndex >= $rightBound)
        return (-1);
    $curChar = jur_DecomposedCharSet_codePointAt($this, $strIndex, $testString, $rightBound);
    var$7 = $strIndex + $this.$readCharsForCodePoint | 0;
    $decCurCodePoint = jur_Lexer_decompTable.$get3($curChar);
    if ($decCurCodePoint === null) {
        var$9 = $decCodePoint.data;
        $strIndex = 1;
        var$9[0] = $curChar;
    } else {
        $strIndex = $decCurCodePoint.data.length;
        jl_System_arraycopy($decCurCodePoint, 0, $decCodePoint, 0, $strIndex);
        $strIndex = 0 + $strIndex | 0;
    }
    a: {
        if (var$7 < $rightBound) {
            $decCurCodePoint = $decCodePoint.data;
            $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
            while ($strIndex < 4) {
                if (!jur_Lexer_hasDecompositionNonNullCanClass($curChar)) {
                    var$10 = $strIndex + 1 | 0;
                    $decCurCodePoint[$strIndex] = $curChar;
                } else {
                    var$9 = (jur_Lexer_decompTable.$get3($curChar)).data;
                    if (var$9.length != 2) {
                        var$10 = $strIndex + 1 | 0;
                        $decCurCodePoint[$strIndex] = var$9[0];
                    } else {
                        $curChar = $strIndex + 1 | 0;
                        $decCurCodePoint[$strIndex] = var$9[0];
                        var$10 = $curChar + 1 | 0;
                        $decCurCodePoint[$curChar] = var$9[1];
                    }
                }
                var$7 = var$7 + $this.$readCharsForCodePoint | 0;
                if (var$7 >= $rightBound) {
                    $strIndex = var$10;
                    break a;
                }
                $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
                $strIndex = var$10;
            }
        }
    }
    if ($strIndex != $this.$decomposedCharLength0)
        return (-1);
    var$9 = $decCodePoint.data;
    $curChar = 0;
    while (true) {
        if ($curChar >= $strIndex)
            return $this.$next0.$matches(var$7, $testString, $matchResult);
        if (var$9[$curChar] != $this.$decomposedChar0.data[$curChar])
            break;
        $curChar = $curChar + 1 | 0;
    }
    return (-1);
}
function jur_DecomposedCharSet_codePointAt($this, $strIndex, $testString, $rightBound) {
    var $curCodePointUTF16, $curChar, $low, var$7;
    a: {
        $this.$readCharsForCodePoint = 1;
        if ($strIndex >= ($rightBound - 1 | 0)) {
            if ($strIndex >= 0) {
                $curCodePointUTF16 = $testString.$characters.data;
                if ($strIndex < $curCodePointUTF16.length) {
                    $curChar = $curCodePointUTF16[$strIndex];
                    break a;
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
        $rightBound = $strIndex + 1 | 0;
        if ($strIndex >= 0) {
            $curCodePointUTF16 = $testString.$characters.data;
            $low = $curCodePointUTF16.length;
            if ($strIndex < $low) {
                $curChar = $curCodePointUTF16[$strIndex];
                if ($rightBound >= 0 && $rightBound < $low) {
                    $low = $curCodePointUTF16[$rightBound];
                    $strIndex = ($curChar & 64512) != 55296 ? 0 : 1;
                    if ($strIndex && (($low & 64512) != 56320 ? 0 : 1) ? 1 : 0) {
                        $curCodePointUTF16 = $rt_createCharArray(2);
                        var$7 = $curCodePointUTF16.data;
                        var$7[0] = $curChar;
                        var$7[1] = $low;
                        $curChar = jl_Character_codePointAt($curCodePointUTF16, 0, var$7.length);
                        $this.$readCharsForCodePoint = 2;
                    }
                    break a;
                }
                $testString = new jl_StringIndexOutOfBoundsException;
                $testString.$suppressionEnabled = 1;
                $testString.$writableStackTrace = 1;
                $rt_throw($testString);
            }
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    return $curChar;
}
function jur_DecomposedCharSet_first($this, $set) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    a: {
        if ($set instanceof jur_DecomposedCharSet) {
            $set = $set;
            if ($set.$decomposedCharUTF160 === null) {
                var$2 = new jl_StringBuilder;
                var$2.$buffer = $rt_createCharArray(16);
                var$3 = 0;
                while (var$3 < $set.$decomposedCharLength0) {
                    var$4 = $set.$decomposedChar0.data[var$3];
                    if (var$4 < 65536) {
                        var$5 = $rt_createCharArray(1);
                        var$5.data[0] = var$4 & 65535;
                    } else
                        var$5 = $rt_createCharArrayFromData([(55296 | (var$4 - 65536 | 0) >> 10 & 1023) & 65535, (56320 | var$4 & 1023) & 65535]);
                    var$6 = var$5.data.length;
                    jl_AbstractStringBuilder_insert1(var$2, var$2.$length, var$5, 0, var$6);
                    var$3 = var$3 + 1 | 0;
                }
                var$7 = new jl_String;
                var$5 = var$2.$buffer;
                var$4 = var$2.$length;
                var$8 = $rt_createCharArray(var$4);
                var$9 = var$8.data;
                var$7.$characters = var$8;
                var$6 = 0;
                while (var$6 < var$4) {
                    var$9[var$6] = var$5.data[var$6 + 0 | 0];
                    var$6 = var$6 + 1 | 0;
                }
                $set.$decomposedCharUTF160 = var$7;
            }
            var$2 = $set.$decomposedCharUTF160;
            if ($this.$decomposedCharUTF160 === null) {
                $set = new jl_StringBuilder;
                $set.$buffer = $rt_createCharArray(16);
                var$3 = 0;
                while (var$3 < $this.$decomposedCharLength0) {
                    var$10 = $this.$decomposedChar0.data[var$3];
                    if (var$10 < 65536) {
                        var$5 = $rt_createCharArray(1);
                        var$5.data[0] = var$10 & 65535;
                    } else
                        var$5 = $rt_createCharArrayFromData([(55296 | (var$10 - 65536 | 0) >> 10 & 1023) & 65535, (56320 | var$10 & 1023) & 65535]);
                    var$11 = var$5.data.length;
                    jl_AbstractStringBuilder_insert1($set, $set.$length, var$5, 0, var$11);
                    var$3 = var$3 + 1 | 0;
                }
                var$7 = new jl_String;
                var$5 = $set.$buffer;
                var$4 = $set.$length;
                var$8 = $rt_createCharArray(var$4);
                var$9 = var$8.data;
                var$7.$characters = var$8;
                var$6 = 0;
                while (var$6 < var$4) {
                    var$9[var$6] = var$5.data[var$6 + 0 | 0];
                    var$6 = var$6 + 1 | 0;
                }
                $this.$decomposedCharUTF160 = var$7;
            }
            if (!jl_String_equals(var$2, $this.$decomposedCharUTF160)) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
}
function jur_DecomposedCharSet_hasConsumed($this, $matchResult) {
    return 1;
}
var jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet);
function jur_UCIDecomposedCharSet__init_(var_0, var_1) {
    var var_2 = new jur_UCIDecomposedCharSet();
    jur_UCIDecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_UCIDecomposedCharSet__init_0($this, $decomp, $decomposedCharLength) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomp;
    $this.$decomposedCharLength0 = $decomposedCharLength;
}
var jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet);
function jur_CIDecomposedCharSet__init_(var_0, var_1) {
    var var_2 = new jur_CIDecomposedCharSet();
    jur_CIDecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_CIDecomposedCharSet__init_0($this, $decomp, $decomposedCharLength) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomp;
    $this.$decomposedCharLength0 = $decomposedCharLength;
}
var jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet);
function jur_PossessiveGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet);
function jur_PosPlusGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        return (-1);
    if ($nextIndex > $stringIndex) {
        while (true) {
            $stringIndex = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
            if ($stringIndex <= $nextIndex)
                break;
            $nextIndex = $stringIndex;
        }
        $stringIndex = $nextIndex;
    }
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet);
function jur_AltGroupQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_AltGroupQuantifierSet();
    jur_AltGroupQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_AltGroupQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
}
function jur_AltGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_AltGroupQuantifierSet_setNext($this, $next) {
    $this.$next0 = $next;
    $this.$innerSet.$setNext($next);
}
var jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet);
function jur_PosAltGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next0.$matches($nextIndex, $testString, $matchResult);
}
function jur_PosAltGroupQuantifierSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_CompositeGroupQuantifierSet() {
    var a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier = null;
    a.$setCounter = 0;
}
function jur_CompositeGroupQuantifierSet__init_0(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function jur_CompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter) {
    var var$6, var$7;
    var$6 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$6 + 1 | 0;
    var$7 = new jl_AbstractStringBuilder;
    var$7.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$7, var$7.$length, var$6, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$quantifier = $quant;
    $this.$setCounter = $setCounter;
}
function jur_CompositeGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $enterCounter, var$5, $nextIndex, var$7;
    $enterCounter = $this.$setCounter;
    $enterCounter = $matchResult.$compQuantCounters.data[$enterCounter];
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier.$max)
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    var$5 = $this.$setCounter;
    $enterCounter = $enterCounter + 1 | 0;
    $matchResult.$compQuantCounters.data[var$5] = $enterCounter;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        $stringIndex = $this.$setCounter;
        $matchResult.$compQuantCounters.data[$stringIndex] = 0;
        return $nextIndex;
    }
    $nextIndex = $this.$setCounter;
    $enterCounter = $enterCounter + (-1) | 0;
    var$7 = $matchResult.$compQuantCounters.data;
    var$7[$nextIndex] = $enterCounter;
    if ($enterCounter >= $this.$quantifier.$min)
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    var$7[$nextIndex] = 0;
    return (-1);
}
var jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet);
function jur_PosCompositeGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier.$max;
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier.$min)
        return (-1);
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet);
function jur_ReluctantGroupQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_ReluctantGroupQuantifierSet();
    jur_ReluctantGroupQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_ReluctantGroupQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
}
function jur_ReluctantGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $res;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    $res = $this.$next0.$matches($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        return $res;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
}
var jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet);
function jur_RelAltGroupQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_RelAltGroupQuantifierSet();
    jur_RelAltGroupQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_RelAltGroupQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$5);
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
}
function jur_RelAltGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$next0.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $nextIndex;
}
var jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet);
function jur_RelCompositeGroupQuantifierSet__init_0(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new jur_RelCompositeGroupQuantifierSet();
    jur_RelCompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function jur_RelCompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter) {
    var var$6, var$7;
    var$6 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$6 + 1 | 0;
    var$7 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$7);
    var$7.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$7, var$7.$length, var$6, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$quantifier = $quant;
    $this.$setCounter = $setCounter;
}
function jur_RelCompositeGroupQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $nextIndex, $enterCounter, var$6;
    $nextIndex = $this.$setCounter;
    $enterCounter = $matchResult.$compQuantCounters.data[$nextIndex];
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    var$6 = $this.$quantifier;
    if ($enterCounter >= var$6.$max) {
        $nextIndex = $this.$setCounter;
        $matchResult.$compQuantCounters.data[$nextIndex] = 0;
        return $this.$next0.$matches($stringIndex, $testString, $matchResult);
    }
    if ($enterCounter < var$6.$min) {
        $nextIndex = $this.$setCounter;
        $matchResult.$compQuantCounters.data[$nextIndex] = $enterCounter + 1 | 0;
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    } else {
        $nextIndex = $this.$next0.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex >= 0) {
            $stringIndex = $this.$setCounter;
            $matchResult.$compQuantCounters.data[$stringIndex] = 0;
            return $nextIndex;
        }
        $nextIndex = $this.$setCounter;
        $matchResult.$compQuantCounters.data[$nextIndex] = $enterCounter + 1 | 0;
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    }
    return $nextIndex;
}
var jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet);
function jur_DotAllQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_DotAllQuantifierSet();
    jur_DotAllQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_DotAllQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
}
function jur_DotAllQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength;
    $strLength = $matchResult.$rightBound;
    if ($strLength > $stringIndex)
        return $this.$next0.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_DotAllQuantifierSet_find($this, $stringIndex, $testString, $matchResult) {
    var $strLength;
    $strLength = $matchResult.$rightBound;
    if ($this.$next0.$findBack($stringIndex, $strLength, $testString, $matchResult) >= 0)
        return $stringIndex;
    return (-1);
}
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
function jur_DotQuantifierSet__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jur_DotQuantifierSet();
    jur_DotQuantifierSet__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jur_DotQuantifierSet__init_0($this, $innerSet, $next, $type, $lt) {
    var var$5, var$6;
    var$5 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$5 + 1 | 0;
    var$6 = new jl_AbstractStringBuilder;
    var$6.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$lt = $lt;
}
function jur_DotQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength, $startSearch, var$6, var$7;
    $strLength = $matchResult.$rightBound;
    $startSearch = $stringIndex;
    a: {
        while (true) {
            if ($startSearch >= $strLength) {
                $startSearch = (-1);
                break a;
            }
            var$6 = $this.$lt;
            if ($startSearch < 0)
                break;
            var$7 = $testString.$characters.data;
            if ($startSearch >= var$7.length)
                break;
            if (var$6.$isLineTerminator(var$7[$startSearch]))
                break a;
            $startSearch = $startSearch + 1 | 0;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength > $stringIndex)
        return $this.$next0.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_DotQuantifierSet_find($this, $stringIndex, $testString, $matchResult) {
    var $strLength, $res, $nextSearch, var$7, var$8, var$9, $leftBound;
    $strLength = $matchResult.$rightBound;
    $res = $this.$next0.$find0($stringIndex, $testString, $matchResult);
    if ($res < 0)
        return (-1);
    $nextSearch = $res;
    a: {
        while (true) {
            if ($nextSearch >= $strLength) {
                $nextSearch = (-1);
                break a;
            }
            var$7 = $this.$lt;
            if ($nextSearch < 0)
                break;
            var$8 = $testString.$characters.data;
            if ($nextSearch >= var$8.length)
                break;
            if (var$7.$isLineTerminator(var$8[$nextSearch]))
                break a;
            $nextSearch = $nextSearch + 1 | 0;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    if ($nextSearch >= 0)
        $strLength = $nextSearch;
    var$9 = $this.$next0.$findBack($res, $strLength, $testString, $matchResult);
    if ($res > var$9)
        var$9 = $res;
    if (var$9 <= 0)
        $leftBound = var$9 ? (-1) : 0;
    else {
        $leftBound = var$9 - 1 | 0;
        b: {
            while (true) {
                if ($leftBound < $stringIndex) {
                    $leftBound = (-1);
                    break b;
                }
                $matchResult = $this.$lt;
                if ($leftBound < 0)
                    break;
                var$8 = $testString.$characters.data;
                if ($leftBound >= var$8.length)
                    break;
                if ($matchResult.$isLineTerminator(var$8[$leftBound]))
                    break b;
                $leftBound = $leftBound + (-1) | 0;
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    if ($leftBound >= $stringIndex)
        $stringIndex = $leftBound >= var$9 ? $leftBound : $leftBound + 1 | 0;
    return $stringIndex;
}
var jur_AbstractLineTerminator = $rt_classWithoutFields();
var jur_AbstractLineTerminator_unixLT = null;
var jur_AbstractLineTerminator_unicodeLT = null;
function jur_AbstractLineTerminator_getInstance($flag) {
    var var$2;
    if (!($flag & 1)) {
        var$2 = jur_AbstractLineTerminator_unicodeLT;
        if (var$2 !== null)
            return var$2;
        var$2 = new jur_AbstractLineTerminator$2;
        jur_AbstractLineTerminator_unicodeLT = var$2;
        return var$2;
    }
    var$2 = jur_AbstractLineTerminator_unixLT;
    if (var$2 !== null)
        return var$2;
    var$2 = new jur_AbstractLineTerminator$1;
    jur_AbstractLineTerminator_unixLT = var$2;
    return var$2;
}
var jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet);
function jur_PossessiveQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_PossessiveQuantifierSet();
    jur_PossessiveQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_PossessiveQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_PossessiveQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound)
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet);
function jur_PossessiveAltQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_PossessiveAltQuantifierSet();
    jur_PossessiveAltQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_PossessiveAltQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$5);
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_PossessiveAltQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4;
    if (($stringIndex + $this.$leaf.$charCount0() | 0) <= $matchResult.$rightBound) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
var jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet);
function jur_PossessiveCompositeQuantifierSet__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jur_PossessiveCompositeQuantifierSet();
    jur_PossessiveCompositeQuantifierSet__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jur_PossessiveCompositeQuantifierSet__init_0($this, $quant, $innerSet, $next, $type) {
    var var$5, var$6;
    var$5 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$5 + 1 | 0;
    var$6 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$6);
    var$6.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
    $this.$quantifier0 = $quant;
}
function jur_PossessiveCompositeQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min;
    $max = var$4.$max;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $this.$next0.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
}
var jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet);
function jur_ReluctantQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_ReluctantQuantifierSet();
    jur_ReluctantQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_ReluctantQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_ReluctantQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4;
    while (true) {
        var$4 = $this.$next0.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount0() | 0) <= $matchResult.$rightBound) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
}
var jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet);
function jur_ReluctantAltQuantifierSet__init_(var_0, var_1, var_2) {
    var var_3 = new jur_ReluctantAltQuantifierSet();
    jur_ReluctantAltQuantifierSet__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_ReluctantAltQuantifierSet__init_0($this, $innerSet, $next, $type) {
    var var$4, var$5;
    var$4 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$4 + 1 | 0;
    var$5 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$5);
    var$5.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$5, var$5.$length, var$4, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
}
function jur_ReluctantAltQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $shift;
    $shift = $this.$next0.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
}
var jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet);
function jur_ReluctantCompositeQuantifierSet__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jur_ReluctantCompositeQuantifierSet();
    jur_ReluctantCompositeQuantifierSet__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jur_ReluctantCompositeQuantifierSet__init_0($this, $quant, $innerSet, $next, $type) {
    var var$5, var$6;
    var$5 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$5 + 1 | 0;
    var$6 = new jl_AbstractStringBuilder;
    jl_Object__init_0(var$6);
    var$6.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$6, var$6.$length, var$5, 10)).$toString();
    $this.$next0 = $next;
    $this.$innerSet = $innerSet;
    $this.$type = $type;
    $this.$leaf = $innerSet;
    $this.$quantifier0 = $quant;
}
function jur_ReluctantCompositeQuantifierSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4, $min, $max, $i, var$8, var$9;
    var$4 = $this.$quantifier0;
    $min = var$4.$min;
    $max = var$4.$max;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$8 = $this.$next0.$matches($stringIndex, $testString, $matchResult);
                    if (var$8 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount0() | 0) <= $matchResult.$rightBound) {
                        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$8 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$8 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$8;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount0() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$9 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$9 < 1)
            break;
        $stringIndex = $stringIndex + var$9 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
}
var jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet);
function jur_SOLSet__init_() {
    var var_0 = new jur_SOLSet();
    jur_SOLSet__init_0(var_0);
    return var_0;
}
function jur_SOLSet__init_0($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
}
function jur_SOLSet_matches($this, $strIndex, $testString, $matchResult) {
    if ($strIndex && !($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound))
        return (-1);
    return $this.$next0.$matches($strIndex, $testString, $matchResult);
}
function jur_SOLSet_hasConsumed($this, $matchResult) {
    return 0;
}
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
function jur_WordBoundary__init_(var_0) {
    var var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
}
function jur_WordBoundary__init_0($this, $positive) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$positive = $positive;
}
function jur_WordBoundary_matches($this, $stringIndex, $testString, $matchResult) {
    var $ch1, var$5, $ch2, $leftBound;
    a: {
        if ($stringIndex >= $matchResult.$rightBound)
            $ch1 = 32;
        else {
            if ($stringIndex >= 0) {
                var$5 = $testString.$characters.data;
                if ($stringIndex < var$5.length) {
                    $ch1 = var$5[$stringIndex];
                    break a;
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    b: {
        if (!$stringIndex)
            $ch2 = 32;
        else {
            $ch2 = $stringIndex - 1 | 0;
            if ($ch2 >= 0) {
                var$5 = $testString.$characters.data;
                if ($ch2 < var$5.length) {
                    $ch2 = var$5[$ch2];
                    break b;
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    return ($ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString) ? 0 : 1) ^ ($ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString) ? 0 : 1) ^ $this.$positive ? (-1) : $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_WordBoundary_hasConsumed($this, $matchResult) {
    return 0;
}
function jur_WordBoundary_isSpace($this, $ch, $index, $leftBound, $testString) {
    var var$5, var$6;
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 9:
                    break;
                case 6:
                case 7:
                case 8:
                    break b;
                default:
                    break b;
            }
            var$5 = 1;
            break a;
        }
        var$5 = 0;
    }
    if (!var$5 && $ch != 95) {
        c: {
            d: {
                if (jl_Character_getType($ch) == 6)
                    while (true) {
                        $index = $index + (-1) | 0;
                        if ($index < $leftBound)
                            break d;
                        if ($index < 0)
                            break c;
                        var$6 = $testString.$characters.data;
                        if ($index >= var$6.length)
                            break c;
                        e: {
                            f: {
                                $ch = var$6[$index];
                                switch (jl_Character_getType($ch)) {
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 9:
                                        break;
                                    case 6:
                                    case 7:
                                    case 8:
                                        break f;
                                    default:
                                        break f;
                                }
                                var$5 = 1;
                                break e;
                            }
                            var$5 = 0;
                        }
                        if (var$5)
                            return 0;
                        if (jl_Character_getType($ch) != 6)
                            return 1;
                    }
            }
            return 1;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    return 0;
}
var jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet);
function jur_PreviousMatch__init_() {
    var var_0 = new jur_PreviousMatch();
    jur_PreviousMatch__init_0(var_0);
    return var_0;
}
function jur_PreviousMatch__init_0($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
}
function jur_PreviousMatch_matches($this, $stringIndex, $testString, $matchResult) {
    if ($stringIndex != $matchResult.$previousMatch)
        return (-1);
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_PreviousMatch_hasConsumed($this, $matchResult) {
    return 0;
}
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
function jur_EOLSet__init_0(var_0) {
    var var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
}
function jur_EOLSet__init_($this, $counter) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$consCounter = $counter;
}
function jur_EOLSet_matches($this, $strIndex, $testString, $matchResult) {
    var $rightBound, $ch, var$6, var$7;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$characters.data.length;
    if ($strIndex >= $rightBound) {
        $ch = $this.$consCounter;
        $matchResult.$consumers.data[$ch] = 0;
        return $this.$next0.$matches($strIndex, $testString, $matchResult);
    }
    a: {
        var$6 = $rightBound - $strIndex | 0;
        if (var$6 == 2) {
            if ($strIndex >= 0) {
                var$7 = $testString.$characters.data;
                $ch = var$7.length;
                if ($strIndex < $ch) {
                    if (var$7[$strIndex] != 13)
                        break a;
                    $rightBound = $strIndex + 1 | 0;
                    if ($rightBound >= 0 && $rightBound < $ch) {
                        if (var$7[$rightBound] != 10)
                            break a;
                        $ch = $this.$consCounter;
                        $matchResult.$consumers.data[$ch] = 0;
                        return $this.$next0.$matches($strIndex, $testString, $matchResult);
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    b: {
        c: {
            if (var$6 == 1) {
                if ($strIndex >= 0) {
                    var$7 = $testString.$characters.data;
                    if ($strIndex < var$7.length) {
                        $ch = var$7[$strIndex];
                        if ($ch == 10)
                            break b;
                        if ($ch == 13)
                            break b;
                        if ($ch == 133)
                            break b;
                        if (($ch | 1) != 8233)
                            break c;
                        else
                            break b;
                    }
                }
                $testString = new jl_StringIndexOutOfBoundsException;
                $testString.$suppressionEnabled = 1;
                $testString.$writableStackTrace = 1;
                $rt_throw($testString);
            }
        }
        return (-1);
    }
    $rightBound = $this.$consCounter;
    $matchResult.$consumers.data[$rightBound] = 0;
    return $this.$next0.$matches($strIndex, $testString, $matchResult);
}
function jur_EOLSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, $res;
    var$2 = $this.$consCounter;
    var$3 = $matchResult.$consumers.data;
    $res = !var$3[var$2] ? 0 : 1;
    var$3[var$2] = (-1);
    return $res;
}
var jur_EOISet = $rt_classWithoutFields(jur_AbstractSet);
function jur_EOISet__init_() {
    var var_0 = new jur_EOISet();
    jur_EOISet__init_0(var_0);
    return var_0;
}
function jur_EOISet__init_0($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
}
function jur_EOISet_matches($this, $stringIndex, $testString, $matchResult) {
    if ($stringIndex < (!$matchResult.$transparentBounds ? $matchResult.$rightBound : $testString.$characters.data.length))
        return (-1);
    $matchResult.$hitEnd = 1;
    $matchResult.$requireEnd = 1;
    return $this.$next0.$matches($stringIndex, $testString, $matchResult);
}
function jur_EOISet_hasConsumed($this, $matchResult) {
    return 0;
}
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt0 = null;
}
function jur_MultiLineSOLSet__init_(var_0) {
    var var_1 = new jur_MultiLineSOLSet();
    jur_MultiLineSOLSet__init_0(var_1, var_0);
    return var_1;
}
function jur_MultiLineSOLSet__init_0($this, $lt) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$lt0 = $lt;
}
function jur_MultiLineSOLSet_matches($this, $strIndex, $testString, $matchResult) {
    var var$4, var$5, var$6, var$7, var$8;
    a: {
        b: {
            c: {
                if ($strIndex != $matchResult.$rightBound) {
                    if (!$strIndex)
                        break b;
                    if ($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound)
                        break b;
                    var$4 = $this.$lt0;
                    var$5 = $strIndex - 1 | 0;
                    if (var$5 >= 0) {
                        var$6 = $testString.$characters.data;
                        var$7 = var$6.length;
                        if (var$5 < var$7) {
                            var$8 = var$6[var$5];
                            if ($strIndex < 0)
                                break a;
                            if ($strIndex >= var$7)
                                break a;
                            if (!var$4.$isAfterLineTerminator(var$8, var$6[$strIndex]))
                                break c;
                            else
                                break b;
                        }
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            return (-1);
        }
        return $this.$next0.$matches($strIndex, $testString, $matchResult);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_MultiLineSOLSet_hasConsumed($this, $matchResult) {
    return 0;
}
var jur_DotAllSet = $rt_classWithoutFields(jur_JointSet);
function jur_DotAllSet__init_() {
    var var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_0(var_0);
    return var_0;
}
function jur_DotAllSet__init_0($this) {
    var var$1, var$2;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    var$2 = new jl_AbstractStringBuilder;
    var$2.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$2, var$2.$length, var$1, 10)).$toString();
}
function jur_DotAllSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength, var$5, var$6, var$7, $high, $low, var$10;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    if ($stringIndex >= 0) {
        var$6 = $testString.$characters.data;
        var$7 = var$6.length;
        if ($stringIndex < var$7) {
            $high = $rt_compare(var$6[$stringIndex] & 64512, 55296);
            $low = $high ? 0 : 1;
            a: {
                if ($low) {
                    var$10 = $stringIndex + 2 | 0;
                    if (var$10 <= $strLength) {
                        if (var$5 >= 0 && var$5 < var$7) {
                            $low = var$6[var$5];
                            $stringIndex = $high ? 0 : 1;
                            if (!($stringIndex && (($low & 64512) != 56320 ? 0 : 1) ? 1 : 0))
                                break a;
                            else
                                return $this.$next0.$matches(var$10, $testString, $matchResult);
                        }
                        $testString = new jl_StringIndexOutOfBoundsException;
                        $testString.$suppressionEnabled = 1;
                        $testString.$writableStackTrace = 1;
                        $rt_throw($testString);
                    }
                }
            }
            return $this.$next0.$matches(var$5, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_DotAllSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_DotAllSet_getType($this) {
    return (-2147483602);
}
function jur_DotAllSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt1 = null;
}
function jur_DotSet__init_(var_0) {
    var var_1 = new jur_DotSet();
    jur_DotSet__init_0(var_1, var_0);
    return var_1;
}
function jur_DotSet__init_0($this, $lt) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$lt1 = $lt;
}
function jur_DotSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength, var$5, var$6, var$7, $high, var$9, $low, var$11;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    if ($stringIndex >= 0) {
        var$6 = $testString.$characters.data;
        var$7 = var$6.length;
        if ($stringIndex < var$7) {
            $high = var$6[$stringIndex];
            var$9 = $rt_compare($high & 64512, 55296);
            $low = var$9 ? 0 : 1;
            a: {
                if ($low) {
                    var$11 = $stringIndex + 2 | 0;
                    if (var$11 <= $strLength) {
                        if (var$5 >= 0 && var$5 < var$7) {
                            $low = var$6[var$5];
                            $stringIndex = var$9 ? 0 : 1;
                            if (!($stringIndex && (($low & 64512) != 56320 ? 0 : 1) ? 1 : 0))
                                break a;
                            else
                                return $this.$lt1.$isLineTerminator((($high & 1023) << 10 | $low & 1023) + 65536 | 0) ? (-1) : $this.$next0.$matches(var$11, $testString, $matchResult);
                        }
                        $testString = new jl_StringIndexOutOfBoundsException;
                        $testString.$suppressionEnabled = 1;
                        $testString.$writableStackTrace = 1;
                        $rt_throw($testString);
                    }
                }
            }
            return $this.$lt1.$isLineTerminator($high) ? (-1) : $this.$next0.$matches(var$5, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_DotSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_DotSet_getType($this) {
    return (-2147483602);
}
function jur_DotSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
function jur_UEOLSet__init_(var_0) {
    var var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_0(var_1, var_0);
    return var_1;
}
function jur_UEOLSet__init_0($this, $counter) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$consCounter0 = $counter;
}
function jur_UEOLSet_matches($this, $strIndex, $testString, $matchResult) {
    var $rightBound, var$5, var$6;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$characters.data.length;
    if ($strIndex >= $rightBound) {
        $rightBound = $this.$consCounter0;
        $matchResult.$consumers.data[$rightBound] = 0;
        return $this.$next0.$matches($strIndex, $testString, $matchResult);
    }
    a: {
        if (($rightBound - $strIndex | 0) == 1) {
            if ($strIndex >= 0) {
                var$5 = $testString.$characters.data;
                if ($strIndex < var$5.length) {
                    if (var$5[$strIndex] != 10)
                        break a;
                    else {
                        var$6 = $this.$consCounter0;
                        $matchResult.$consumers.data[var$6] = 1;
                        return $this.$next0.$matches($strIndex + 1 | 0, $testString, $matchResult);
                    }
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    return (-1);
}
function jur_UEOLSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, $res;
    var$2 = $this.$consCounter0;
    var$3 = $matchResult.$consumers.data;
    $res = !var$3[var$2] ? 0 : 1;
    var$3[var$2] = (-1);
    return $res;
}
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter1 = 0;
}
function jur_UMultiLineEOLSet__init_(var_0) {
    var var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_0(var_1, var_0);
    return var_1;
}
function jur_UMultiLineEOLSet__init_0($this, $counter) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$consCounter1 = $counter;
}
function jur_UMultiLineEOLSet_matches($this, $strIndex, $testString, $matchResult) {
    var $strDif, var$5, var$6;
    if (($matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$characters.data.length - $strIndex | 0) <= 0) {
        $strDif = $this.$consCounter1;
        $matchResult.$consumers.data[$strDif] = 0;
        return $this.$next0.$matches($strIndex, $testString, $matchResult);
    }
    if ($strIndex >= 0) {
        var$5 = $testString.$characters.data;
        if ($strIndex < var$5.length) {
            if (var$5[$strIndex] != 10)
                return (-1);
            var$6 = $this.$consCounter1;
            $matchResult.$consumers.data[var$6] = 1;
            return $this.$next0.$matches($strIndex + 1 | 0, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_UMultiLineEOLSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, $res;
    var$2 = $this.$consCounter1;
    var$3 = $matchResult.$consumers.data;
    $res = !var$3[var$2] ? 0 : 1;
    var$3[var$2] = (-1);
    return $res;
}
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
function jur_MultiLineEOLSet__init_(var_0) {
    var var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_0(var_1, var_0);
    return var_1;
}
function jur_MultiLineEOLSet__init_0($this, $counter) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$consCounter2 = $counter;
}
function jur_MultiLineEOLSet_matches($this, $strIndex, $testString, $matchResult) {
    var $strDif, var$5, $ch1, $ch2;
    $strDif = $matchResult.$anchoringBounds ? $matchResult.$leftBound - $strIndex | 0 : $testString.$characters.data.length - $strIndex | 0;
    if (!$strDif) {
        $strDif = $this.$consCounter2;
        $matchResult.$consumers.data[$strDif] = 0;
        return $this.$next0.$matches($strIndex, $testString, $matchResult);
    }
    a: {
        if ($strDif < 2) {
            if ($strIndex >= 0) {
                var$5 = $testString.$characters.data;
                if ($strIndex < var$5.length) {
                    $ch1 = var$5[$strIndex];
                    $ch2 = 97;
                    break a;
                }
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
        if ($strIndex >= 0) {
            var$5 = $testString.$characters.data;
            $ch2 = var$5.length;
            if ($strIndex < $ch2) {
                $ch1 = var$5[$strIndex];
                $strDif = $strIndex + 1 | 0;
                if ($strDif >= 0 && $strDif < $ch2) {
                    $ch2 = var$5[$strDif];
                    break a;
                }
                $testString = new jl_StringIndexOutOfBoundsException;
                $testString.$suppressionEnabled = 1;
                $testString.$writableStackTrace = 1;
                $rt_throw($testString);
            }
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    switch ($ch1) {
        case 10:
        case 133:
        case 8232:
        case 8233:
            $strDif = $this.$consCounter2;
            $matchResult.$consumers.data[$strDif] = 0;
            return $this.$next0.$matches($strIndex, $testString, $matchResult);
        case 13:
            if ($ch2 != 10) {
                $strDif = $this.$consCounter2;
                $matchResult.$consumers.data[$strDif] = 0;
                return $this.$next0.$matches($strIndex, $testString, $matchResult);
            }
            $strDif = $this.$consCounter2;
            $matchResult.$consumers.data[$strDif] = 0;
            return $this.$next0.$matches($strIndex, $testString, $matchResult);
        default:
    }
    return (-1);
}
function jur_MultiLineEOLSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, $res;
    var$2 = $this.$consCounter2;
    var$3 = $matchResult.$consumers.data;
    $res = !var$3[var$2] ? 0 : 1;
    var$3[var$2] = (-1);
    return $res;
}
function jur_CIBackReferenceSet() {
    var a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter3 = 0;
}
function jur_CIBackReferenceSet__init_(var_0, var_1) {
    var var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_CIBackReferenceSet__init_0($this, $groupIndex, $consCounter) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter3 = $consCounter;
}
function jur_CIBackReferenceSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $group, $i, var$6, var$7, var$8, var$9, var$10;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$characters.data.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        a: {
            b: {
                c: {
                    d: {
                        while (true) {
                            var$6 = $group.$characters.data;
                            var$7 = var$6.length;
                            var$8 = $rt_compare($i, var$7);
                            if (var$8 >= 0) {
                                $i = $this.$consCounter3;
                                $matchResult.$consumers.data[$i] = var$7;
                                return $this.$next0.$matches($stringIndex + var$7 | 0, $testString, $matchResult);
                            }
                            if ($i < 0)
                                break c;
                            if (var$8 >= 0)
                                break c;
                            var$9 = var$6[$i];
                            var$7 = $stringIndex + $i | 0;
                            if (var$7 < 0)
                                break d;
                            var$10 = $testString.$characters.data;
                            if (var$7 >= var$10.length)
                                break d;
                            if (var$9 != var$10[var$7]) {
                                if ($i < 0)
                                    break a;
                                if (var$8 >= 0)
                                    break a;
                                var$8 = jur_Pattern_getSupplement(var$6[$i]);
                                if (var$7 < 0)
                                    break b;
                                var$10 = $testString.$characters.data;
                                if (var$7 >= var$10.length)
                                    break b;
                                if (var$8 != var$10[var$7])
                                    break;
                            }
                            $i = $i + 1 | 0;
                        }
                        return (-1);
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
                $testString = new jl_StringIndexOutOfBoundsException;
                $testString.$suppressionEnabled = 1;
                $testString.$writableStackTrace = 1;
                $rt_throw($testString);
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    return (-1);
}
function jur_CIBackReferenceSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_CIBackReferenceSet_getString($this, $matchResult) {
    var var$2, var$3, var$4, var$5, var$6, var$7, $res, var$9;
    a: {
        var$2 = $this.$referencedGroup;
        var$3 = $matchResult.$groupBounds.data;
        var$4 = var$2 * 2 | 0;
        var$5 = var$3[var$4];
        var$6 = var$3[var$4 + 1 | 0];
        var$2 = var$6 | var$5;
        var$4 = var$6 - var$5 | 0;
        if ((var$2 | var$4) >= 0) {
            var$7 = $matchResult.$string0.$characters.data;
            if (var$6 <= var$7.length) {
                if (var$5 > var$6) {
                    $matchResult = new jl_IndexOutOfBoundsException;
                    $matchResult.$suppressionEnabled = 1;
                    $matchResult.$writableStackTrace = 1;
                    $rt_throw($matchResult);
                }
                $res = new jl_String;
                var$3 = $rt_createCharArray(var$4);
                var$9 = var$3.data;
                $res.$characters = var$3;
                var$2 = 0;
                while (var$2 < var$4) {
                    var$9[var$2] = var$7[var$2 + var$5 | 0];
                    var$2 = var$2 + 1 | 0;
                }
                break a;
            }
        }
        $res = null;
    }
    return $res;
}
function jur_CIBackReferenceSet_hasConsumed($this, $matchResult) {
    var var$2, var$3, $res;
    var$2 = $this.$consCounter3;
    var$3 = $matchResult.$consumers.data;
    $res = !var$3[var$2] ? 0 : 1;
    var$3[var$2] = (-1);
    return $res;
}
var jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet);
function jur_BackReferenceSet__init_(var_0, var_1) {
    var var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_BackReferenceSet__init_0($this, $groupIndex, $consCounter) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter3 = $consCounter;
}
function jur_BackReferenceSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $group, $shift, var$6;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$characters.data.length | 0) <= $matchResult.$rightBound) {
        $shift = !jl_String_startsWith($testString, $group, $stringIndex) ? (-1) : $group.$characters.data.length;
        if ($shift < 0)
            return (-1);
        var$6 = $this.$consCounter3;
        $matchResult.$consumers.data[var$6] = $shift;
        return $this.$next0.$matches($stringIndex + $shift | 0, $testString, $matchResult);
    }
    return (-1);
}
function jur_BackReferenceSet_find($this, $strIndex, $testString, $matchResult) {
    var $group, $strLength;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    $strLength = $matchResult.$leftBound;
    if ($group !== null && ($strIndex + $group.$characters.data.length | 0) <= $strLength) {
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            $strIndex = jl_String_indexOf0($testString, $group, $strIndex);
            if ($strIndex < 0)
                return (-1);
            if ($this.$next0.$matches($strIndex + $group.$characters.data.length | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = $strIndex + 1 | 0;
        }
        return $strIndex;
    }
    return (-1);
}
function jur_BackReferenceSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult) {
    var $group, var$6;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group === null)
        return (-1);
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = jl_String_lastIndexOf0($testString, $group, $lastIndex);
            if (var$6 < 0)
                break a;
            if (var$6 < $strIndex)
                break a;
            if ($this.$next0.$matches(var$6 + $group.$characters.data.length | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$6 + (-1) | 0;
        }
        return var$6;
    }
    return (-1);
}
function jur_BackReferenceSet_first($this, $set) {
    return 1;
}
var jur_UCIBackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet);
function jur_UCIBackReferenceSet__init_(var_0, var_1) {
    var var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_UCIBackReferenceSet__init_0($this, $groupIndex, $consCounter) {
    var var$3, var$4;
    var$3 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$3 + 1 | 0;
    var$4 = new jl_AbstractStringBuilder;
    var$4.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$4, var$4.$length, var$3, 10)).$toString();
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter3 = $consCounter;
}
function jur_UCIBackReferenceSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4, var$5, var$6, var$7, $i, var$9, $group, var$11;
    a: {
        var$4 = $this.$referencedGroup;
        var$5 = $matchResult.$groupBounds.data;
        var$6 = var$4 * 2 | 0;
        var$7 = var$5[var$6];
        $i = var$5[var$6 + 1 | 0];
        var$6 = $i | var$7;
        var$4 = $i - var$7 | 0;
        if ((var$6 | var$4) >= 0) {
            var$9 = $matchResult.$string0.$characters.data;
            if ($i <= var$9.length) {
                if (var$7 > $i) {
                    $testString = new jl_IndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    jl_Throwable_fillInStackTrace($testString);
                    $rt_throw($testString);
                }
                $group = new jl_String;
                var$5 = $rt_createCharArray(var$4);
                var$11 = var$5.data;
                $group.$characters = var$5;
                var$6 = 0;
                while (var$6 < var$4) {
                    var$11[var$6] = var$9[var$6 + var$7 | 0];
                    var$6 = var$6 + 1 | 0;
                }
                break a;
            }
        }
        $group = null;
    }
    if ($group !== null && ($stringIndex + $group.$characters.data.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        b: {
            c: {
                while (true) {
                    var$5 = $group.$characters.data;
                    var$6 = var$5.length;
                    var$4 = $rt_compare($i, var$6);
                    if (var$4 >= 0) {
                        var$4 = $this.$consCounter3;
                        $matchResult.$consumers.data[var$4] = var$6;
                        return $this.$next0.$matches($stringIndex + var$6 | 0, $testString, $matchResult);
                    }
                    if ($i < 0)
                        break b;
                    if (var$4 >= 0)
                        break b;
                    var$6 = (String.fromCharCode((String.fromCharCode(var$5[$i])).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535;
                    var$7 = $stringIndex + $i | 0;
                    if (var$7 < 0)
                        break c;
                    var$5 = $testString.$characters.data;
                    if (var$7 >= var$5.length)
                        break c;
                    if (var$6 != ((String.fromCharCode((String.fromCharCode(var$5[var$7])).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535))
                        break;
                    $i = $i + 1 | 0;
                }
                return (-1);
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    return (-1);
}
var jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder);
function jl_StringBuffer_insert($this, var$1, var$2, var$3, var$4) {
    var var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, var$1, var$1 + var$4 | 0);
    var$5 = var$4 + var$3 | 0;
    while (var$3 < var$5) {
        var$6 = var$2.data;
        var$7 = $this.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$8 = var$3 + 1 | 0;
        var$7[var$1] = var$6[var$3];
        var$1 = var$4;
        var$3 = var$8;
    }
    return $this;
}
function jl_StringBuffer_append($this, var$1, var$2, var$3) {
    var var$4, var$5, var$6, var$7, var$8;
    var$4 = $this.$length;
    jl_AbstractStringBuilder_insertSpace($this, var$4, var$4 + var$3 | 0);
    var$5 = var$3 + var$2 | 0;
    while (var$2 < var$5) {
        var$6 = var$1.data;
        var$7 = $this.$buffer.data;
        var$3 = var$4 + 1 | 0;
        var$8 = var$2 + 1 | 0;
        var$7[var$4] = var$6[var$2];
        var$4 = var$3;
        var$2 = var$8;
    }
    return $this;
}
function jl_StringBuffer_charAt($this, var$1) {
    var var$2;
    if (var$1 >= 0 && var$1 < $this.$length)
        return $this.$buffer.data[var$1];
    var$2 = new jl_IndexOutOfBoundsException;
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    $rt_throw(var$2);
}
function jl_StringBuffer_length($this) {
    return $this.$length;
}
function jl_StringBuffer_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuffer_insert0($this, var$1, var$2) {
    jl_AbstractStringBuilder_insertSpace($this, var$1, var$1 + 1 | 0);
    $this.$buffer.data[var$1] = var$2;
    return $this;
}
function jur_SequenceSet() {
    var a = this; jur_LeafSet.call(a);
    a.$string1 = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
function jur_SequenceSet__init_(var_0) {
    var var_1 = new jur_SequenceSet();
    jur_SequenceSet__init_0(var_1, var_0);
    return var_1;
}
function jur_SequenceSet__init_0($this, $substring) {
    var $j, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    $j = jur_AbstractSet_counter;
    jur_AbstractSet_counter = $j + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, $j, 10)).$toString();
    $this.$charCount = 1;
    var$3 = new jl_String;
    var$4 = $substring.$buffer;
    var$5 = $substring.$length;
    var$6 = $rt_createCharArray(var$5);
    var$7 = var$6.data;
    var$3.$characters = var$6;
    var$8 = 0;
    while (var$8 < var$5) {
        var$7[var$8] = var$4.data[var$8 + 0 | 0];
        var$8 = var$8 + 1 | 0;
    }
    $this.$string1 = var$3;
    $this.$charCount = var$5;
    $this.$leftToRight = jur_SequenceSet$IntHash__init_(var$5);
    $this.$rightToLeft = jur_SequenceSet$IntHash__init_($this.$charCount);
    $j = 0;
    a: {
        b: {
            while (true) {
                var$9 = $this.$charCount;
                if ($j >= (var$9 - 1 | 0))
                    break;
                $substring = $this.$leftToRight;
                var$3 = $this.$string1;
                if ($j < 0)
                    break a;
                var$7 = var$3.$characters.data;
                if ($j >= var$7.length)
                    break a;
                jur_SequenceSet$IntHash_put($substring, var$7[$j], (var$9 - $j | 0) - 1 | 0);
                $substring = $this.$rightToLeft;
                var$3 = $this.$string1;
                var$9 = ($this.$charCount - $j | 0) - 1 | 0;
                if (var$9 < 0)
                    break b;
                var$7 = var$3.$characters.data;
                if (var$9 >= var$7.length)
                    break b;
                jur_SequenceSet$IntHash_put($substring, var$7[var$9], var$9);
                $j = $j + 1 | 0;
            }
            return;
        }
        $substring = new jl_StringIndexOutOfBoundsException;
        $substring.$suppressionEnabled = 1;
        $substring.$writableStackTrace = 1;
        $rt_throw($substring);
    }
    $substring = new jl_StringIndexOutOfBoundsException;
    $substring.$suppressionEnabled = 1;
    $substring.$writableStackTrace = 1;
    $rt_throw($substring);
}
function jur_SequenceSet_accepts($this, $strIndex, $testString) {
    var var$3, var$4, var$5, var$6, var$7, var$8;
    var$3 = 0;
    a: {
        b: {
            c: {
                while (true) {
                    var$4 = $this.$charCount;
                    if (var$3 >= var$4)
                        break;
                    var$5 = var$3 + $strIndex | 0;
                    if (var$5 < 0)
                        break a;
                    var$6 = $testString.$characters.data;
                    if (var$5 >= var$6.length)
                        break a;
                    var$7 = var$6[var$5];
                    var$8 = $this.$string1;
                    if (var$3 < 0)
                        break b;
                    var$6 = var$8.$characters.data;
                    if (var$3 >= var$6.length)
                        break b;
                    if (var$7 != var$6[var$3]) {
                        $strIndex = 0;
                        break c;
                    }
                    var$3 = var$3 + 1 | 0;
                }
                $strIndex = 1;
            }
            if (!$strIndex)
                var$4 = (-1);
            return var$4;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_SequenceSet_find($this, $strIndex, $testString, $matchResult) {
    var $strLength, var$5;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$5 = jur_SequenceSet_indexOf($this, $testString, $strIndex, $strLength);
        if (var$5 < 0)
            return (-1);
        if ($this.$next0.$matches(var$5 + $this.$charCount | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = var$5 + 1 | 0;
    }
    return var$5;
}
function jur_SequenceSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult) {
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        $lastIndex = jur_SequenceSet_lastIndexOf($this, $testString, $strIndex, $lastIndex);
        if ($lastIndex < 0)
            return (-1);
        if ($this.$next0.$matches($lastIndex + $this.$charCount | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = $lastIndex + (-1) | 0;
    }
    return $lastIndex;
}
function jur_SequenceSet_first($this, $set) {
    var var$2, var$3, var$4, var$5, var$6, var$7;
    if ($set instanceof jur_CharSet) {
        var$2 = $set.$ch0;
        var$3 = $this.$string1.$characters.data;
        if (0 < var$3.length)
            return var$2 != var$3[0] ? 0 : 1;
        $set = new jl_StringIndexOutOfBoundsException;
        $set.$suppressionEnabled = 1;
        $set.$writableStackTrace = 1;
        $rt_throw($set);
    }
    if ($set instanceof jur_RangeSet) {
        $set = $set;
        var$3 = $this.$string1.$characters;
        var$4 = $rt_createCharArray(1).data;
        var$5 = 0;
        while (var$5 < 1) {
            var$4[var$5] = var$3.data[var$5 + 0 | 0];
            var$5 = var$5 + 1 | 0;
        }
        $set = $set.$chars1;
        if (0 >= var$4.length) {
            $set = new jl_StringIndexOutOfBoundsException;
            $set.$suppressionEnabled = 1;
            $set.$writableStackTrace = 1;
            $rt_throw($set);
        }
        return (!$set.$contains(var$4[0]) ? (-1) : 1) <= 0 ? 0 : 1;
    }
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        a: {
            var$3 = $this.$string1.$characters.data;
            var$6 = var$3.length;
            if (var$6 > 1) {
                var$5 = $set.$ch4;
                if (0 >= var$6) {
                    $set = new jl_StringIndexOutOfBoundsException;
                    $set.$suppressionEnabled = 1;
                    $set.$writableStackTrace = 1;
                    $rt_throw($set);
                }
                var$7 = var$3[0];
                if (1 >= var$6) {
                    $set = new jl_StringIndexOutOfBoundsException;
                    jl_Throwable__init_0($set);
                    $rt_throw($set);
                }
                if (var$5 == jl_Character_toCodePoint(var$7, var$3[1])) {
                    var$2 = 1;
                    break a;
                }
            }
            var$2 = 0;
        }
        return var$2;
    }
    $set = $set;
    var$3 = $this.$string1.$characters.data;
    if (0 >= var$3.length) {
        $set = new jl_StringIndexOutOfBoundsException;
        $set.$suppressionEnabled = 1;
        $set.$writableStackTrace = 1;
        $rt_throw($set);
    }
    b: {
        c: {
            if (!$set.$contains(var$3[0])) {
                var$3 = $this.$string1.$characters.data;
                var$7 = var$3.length;
                if (var$7 <= 1)
                    break c;
                if (0 >= var$7) {
                    $set = new jl_StringIndexOutOfBoundsException;
                    $set.$suppressionEnabled = 1;
                    $set.$writableStackTrace = 1;
                    $rt_throw($set);
                }
                var$5 = var$3[0];
                if (1 >= var$7) {
                    $set = new jl_StringIndexOutOfBoundsException;
                    $set.$suppressionEnabled = 1;
                    $set.$writableStackTrace = 1;
                    $rt_throw($set);
                }
                if (!$set.$contains(((var$5 & 1023) << 10 | var$3[1] & 1023) + 65536 | 0))
                    break c;
            }
            var$2 = 1;
            break b;
        }
        var$2 = 0;
    }
    return var$2;
}
function jur_SequenceSet_indexOf($this, $str, $i, $to) {
    var var$4, $ch, var$6, $last, var$8, var$9, var$10, var$11, var$12, var$13;
    var$4 = $this.$string1;
    $ch = $this.$charCount - 1 | 0;
    if ($ch >= 0) {
        var$6 = var$4.$characters.data;
        if ($ch < var$6.length) {
            $last = var$6[$ch];
            a: {
                b: {
                    c: {
                        while (true) {
                            var$8 = $this.$charCount;
                            if ($i > ($to - var$8 | 0))
                                return (-1);
                            var$9 = ($i + var$8 | 0) - 1 | 0;
                            if (var$9 < 0)
                                break c;
                            var$6 = $str.$characters.data;
                            var$10 = var$6.length;
                            if (var$9 >= var$10)
                                break c;
                            $ch = var$6[var$9];
                            if ($ch == $last) {
                                var$9 = 0;
                                d: {
                                    while (var$9 < var$8) {
                                        var$11 = var$9 + $i | 0;
                                        if (var$11 < 0)
                                            break a;
                                        if (var$11 >= var$10)
                                            break a;
                                        var$12 = var$6[var$11];
                                        var$4 = $this.$string1;
                                        if (var$9 < 0)
                                            break b;
                                        var$13 = var$4.$characters.data;
                                        if (var$9 >= var$13.length)
                                            break b;
                                        if (var$12 != var$13[var$9]) {
                                            var$10 = 0;
                                            break d;
                                        }
                                        var$9 = var$9 + 1 | 0;
                                    }
                                    var$10 = 1;
                                }
                                if (var$10)
                                    break;
                            }
                            $i = $i + jur_SequenceSet$IntHash_get($this.$leftToRight, $ch) | 0;
                        }
                        return $i;
                    }
                    $str = new jl_StringIndexOutOfBoundsException;
                    $str.$suppressionEnabled = 1;
                    $str.$writableStackTrace = 1;
                    $rt_throw($str);
                }
                $str = new jl_StringIndexOutOfBoundsException;
                $str.$suppressionEnabled = 1;
                $str.$writableStackTrace = 1;
                $rt_throw($str);
            }
            $str = new jl_StringIndexOutOfBoundsException;
            $str.$suppressionEnabled = 1;
            $str.$writableStackTrace = 1;
            $rt_throw($str);
        }
    }
    $str = new jl_StringIndexOutOfBoundsException;
    $str.$suppressionEnabled = 1;
    $str.$writableStackTrace = 1;
    $rt_throw($str);
}
function jur_SequenceSet_lastIndexOf($this, $str, $to, $i) {
    var var$4, $first, $delta, $ch, var$8, $size, var$10, var$11;
    var$4 = $this.$string1.$characters.data;
    if (0 >= var$4.length) {
        $str = new jl_StringIndexOutOfBoundsException;
        $str.$suppressionEnabled = 1;
        $str.$writableStackTrace = 1;
        $rt_throw($str);
    }
    $first = var$4[0];
    $delta = ($str.$characters.data.length - $i | 0) - $this.$charCount | 0;
    if ($delta <= 0)
        $i = $i + $delta | 0;
    a: {
        b: {
            c: {
                while (true) {
                    if ($i < $to)
                        return (-1);
                    if ($i < 0)
                        break c;
                    var$4 = $str.$characters.data;
                    $delta = var$4.length;
                    if ($i >= $delta)
                        break c;
                    $ch = var$4[$i];
                    if ($ch == $first) {
                        var$8 = 0;
                        d: {
                            while (var$8 < $this.$charCount) {
                                $size = var$8 + $i | 0;
                                if ($size < 0)
                                    break a;
                                if ($size >= $delta)
                                    break a;
                                $size = var$4[$size];
                                var$10 = $this.$string1;
                                if (var$8 < 0)
                                    break b;
                                var$11 = var$10.$characters.data;
                                if (var$8 >= var$11.length)
                                    break b;
                                if ($size != var$11[var$8]) {
                                    $size = 0;
                                    break d;
                                }
                                var$8 = var$8 + 1 | 0;
                            }
                            $size = 1;
                        }
                        if ($size)
                            break;
                    }
                    $i = $i - jur_SequenceSet$IntHash_get($this.$rightToLeft, $ch) | 0;
                }
                return $i;
            }
            $str = new jl_StringIndexOutOfBoundsException;
            $str.$suppressionEnabled = 1;
            $str.$writableStackTrace = 1;
            $rt_throw($str);
        }
        $str = new jl_StringIndexOutOfBoundsException;
        $str.$suppressionEnabled = 1;
        $str.$writableStackTrace = 1;
        $rt_throw($str);
    }
    $str = new jl_StringIndexOutOfBoundsException;
    $str.$suppressionEnabled = 1;
    $str.$writableStackTrace = 1;
    $rt_throw($str);
}
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string = null;
}
function jur_UCISequenceSet_accepts($this, $strIndex, $testString) {
    var $i, var$4, var$5, var$6, var$7;
    $i = 0;
    a: {
        b: {
            while (true) {
                var$4 = $this.$string.$characters.data;
                var$5 = var$4.length;
                var$6 = $rt_compare($i, var$5);
                if (var$6 >= 0)
                    break;
                if ($i < 0)
                    break a;
                if (var$6 >= 0)
                    break a;
                var$5 = var$4[$i];
                var$7 = $strIndex + $i | 0;
                if (var$7 < 0)
                    break b;
                var$4 = $testString.$characters.data;
                if (var$7 >= var$4.length)
                    break b;
                if (var$5 != ((String.fromCharCode((String.fromCharCode(var$4[var$7])).toUpperCase().charCodeAt(0) & 65535)).toLowerCase().charCodeAt(0) & 65535))
                    return (-1);
                $i = $i + 1 | 0;
            }
            return var$5;
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string2 = null;
}
function jur_CISequenceSet__init_(var_0) {
    var var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_0(var_1, var_0);
    return var_1;
}
function jur_CISequenceSet__init_0($this, $substring) {
    var var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    var$3 = new jl_String;
    var$4 = $substring.$buffer;
    var$5 = $substring.$length;
    var$6 = $rt_createCharArray(var$5);
    var$7 = var$6.data;
    var$3.$characters = var$6;
    var$8 = 0;
    while (var$8 < var$5) {
        var$7[var$8] = var$4.data[var$8 + 0 | 0];
        var$8 = var$8 + 1 | 0;
    }
    $this.$string2 = var$3;
    $this.$charCount = var$5;
}
function jur_CISequenceSet_accepts($this, $strIndex, $testString) {
    var $i, var$4, var$5, var$6, var$7, var$8, var$9;
    $i = 0;
    a: {
        b: {
            c: {
                d: {
                    while (true) {
                        var$4 = $this.$string2.$characters.data;
                        var$5 = var$4.length;
                        var$6 = $rt_compare($i, var$5);
                        if (var$6 >= 0)
                            break;
                        if ($i < 0)
                            break c;
                        if (var$6 >= 0)
                            break c;
                        var$7 = var$4[$i];
                        var$8 = $strIndex + $i | 0;
                        if (var$8 < 0)
                            break d;
                        var$9 = $testString.$characters.data;
                        if (var$8 >= var$9.length)
                            break d;
                        if (var$7 != var$9[var$8]) {
                            if ($i < 0)
                                break a;
                            if (var$6 >= 0)
                                break a;
                            var$5 = jur_Pattern_getSupplement(var$4[$i]);
                            if (var$8 < 0)
                                break b;
                            var$4 = $testString.$characters.data;
                            if (var$8 >= var$4.length)
                                break b;
                            if (var$5 != var$4[var$8])
                                return (-1);
                        }
                        $i = $i + 1 | 0;
                    }
                    return var$5;
                }
                $testString = new jl_StringIndexOutOfBoundsException;
                $testString.$suppressionEnabled = 1;
                $testString.$writableStackTrace = 1;
                $rt_throw($testString);
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
        $testString = new jl_StringIndexOutOfBoundsException;
        $testString.$suppressionEnabled = 1;
        $testString.$writableStackTrace = 1;
        $rt_throw($testString);
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
var jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields();
var jur_AbstractCharClass$PredefinedCharacterClasses_space = null;
var jur_AbstractCharClass$PredefinedCharacterClasses_digit = null;
var jur_AbstractCharClass$PredefinedCharacterClasses_contents = null;
function jur_AbstractCharClass$PredefinedCharacterClasses_getObject($this, $name) {
    var $i, $row, var$4;
    $i = 0;
    while (true) {
        $row = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data;
        if ($i >= $row.length) {
            var$4 = new ju_MissingResourceException;
            var$4.$suppressionEnabled = 1;
            var$4.$writableStackTrace = 1;
            var$4.$message = $rt_s(47);
            var$4.$className = $rt_s(47);
            var$4.$key = $name;
            $rt_throw(var$4);
        }
        $row = $row[$i].data;
        if (jl_String_equals($name, $row[0]))
            break;
        $i = $i + 1 | 0;
    }
    return $row[1];
}
function jur_AbstractCharClass$PredefinedCharacterClasses__clinit_() {
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_();
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = $rt_createArrayFromData($rt_arraycls(jl_Object), [$rt_createArrayFromData(jl_Object, [$rt_s(74), jur_AbstractCharClass$LazyLower__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(75), jur_AbstractCharClass$LazyUpper__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(76), jur_AbstractCharClass$LazyASCII__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(77), jur_AbstractCharClass$LazyAlpha__init_()]), $rt_createArrayFromData(jl_Object,
    [$rt_s(78), jur_AbstractCharClass$PredefinedCharacterClasses_digit]), $rt_createArrayFromData(jl_Object, [$rt_s(79), jur_AbstractCharClass$LazyAlnum__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(80), jur_AbstractCharClass$LazyPunct__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(81), jur_AbstractCharClass$LazyGraph__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(82), jur_AbstractCharClass$LazyPrint__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(83), jur_AbstractCharClass$LazyBlank__init_()]),
    $rt_createArrayFromData(jl_Object, [$rt_s(84), jur_AbstractCharClass$LazyCntrl__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(85), jur_AbstractCharClass$LazyXDigit__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(86), jur_AbstractCharClass$LazyJavaLowerCase__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(87), jur_AbstractCharClass$LazyJavaUpperCase__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(88), jur_AbstractCharClass$LazyJavaWhitespace__init_()]), $rt_createArrayFromData(jl_Object,
    [$rt_s(89), jur_AbstractCharClass$LazyJavaMirrored__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(90), jur_AbstractCharClass$LazyJavaDefined__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(91), jur_AbstractCharClass$LazyJavaDigit__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(92), jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(93), jur_AbstractCharClass$LazyJavaISOControl__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(94),
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(95), jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(96), jur_AbstractCharClass$LazyJavaLetter__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(97), jur_AbstractCharClass$LazyJavaLetterOrDigit__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(98), jur_AbstractCharClass$LazyJavaSpaceChar__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(99),
    jur_AbstractCharClass$LazyJavaTitleCase__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(100), jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(101), jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(102), jur_AbstractCharClass$PredefinedCharacterClasses_space]), $rt_createArrayFromData(jl_Object, [$rt_s(103), jur_AbstractCharClass$LazyWord__init_()]), $rt_createArrayFromData(jl_Object,
    [$rt_s(104), jur_AbstractCharClass$LazyNonWord__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(105), jur_AbstractCharClass$PredefinedCharacterClasses_space]), $rt_createArrayFromData(jl_Object, [$rt_s(106), jur_AbstractCharClass$LazyNonSpace__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(107), jur_AbstractCharClass$PredefinedCharacterClasses_digit]), $rt_createArrayFromData(jl_Object, [$rt_s(108), jur_AbstractCharClass$LazyNonDigit__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(109),
    jur_AbstractCharClass$LazyRange__init_(0, 127)]), $rt_createArrayFromData(jl_Object, [$rt_s(110), jur_AbstractCharClass$LazyRange__init_(128, 255)]), $rt_createArrayFromData(jl_Object, [$rt_s(111), jur_AbstractCharClass$LazyRange__init_(256, 383)]), $rt_createArrayFromData(jl_Object, [$rt_s(112), jur_AbstractCharClass$LazyRange__init_(384, 591)]), $rt_createArrayFromData(jl_Object, [$rt_s(113), jur_AbstractCharClass$LazyRange__init_(592, 687)]), $rt_createArrayFromData(jl_Object, [$rt_s(114), jur_AbstractCharClass$LazyRange__init_(688,
    767)]), $rt_createArrayFromData(jl_Object, [$rt_s(115), jur_AbstractCharClass$LazyRange__init_(768, 879)]), $rt_createArrayFromData(jl_Object, [$rt_s(116), jur_AbstractCharClass$LazyRange__init_(880, 1023)]), $rt_createArrayFromData(jl_Object, [$rt_s(117), jur_AbstractCharClass$LazyRange__init_(1024, 1279)]), $rt_createArrayFromData(jl_Object, [$rt_s(118), jur_AbstractCharClass$LazyRange__init_(1280, 1327)]), $rt_createArrayFromData(jl_Object, [$rt_s(119), jur_AbstractCharClass$LazyRange__init_(1328, 1423)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(120), jur_AbstractCharClass$LazyRange__init_(1424, 1535)]), $rt_createArrayFromData(jl_Object, [$rt_s(121), jur_AbstractCharClass$LazyRange__init_(1536, 1791)]), $rt_createArrayFromData(jl_Object, [$rt_s(122), jur_AbstractCharClass$LazyRange__init_(1792, 1871)]), $rt_createArrayFromData(jl_Object, [$rt_s(123), jur_AbstractCharClass$LazyRange__init_(1872, 1919)]), $rt_createArrayFromData(jl_Object, [$rt_s(124), jur_AbstractCharClass$LazyRange__init_(1920, 1983)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(125), jur_AbstractCharClass$LazyRange__init_(2304, 2431)]), $rt_createArrayFromData(jl_Object, [$rt_s(126), jur_AbstractCharClass$LazyRange__init_(2432, 2559)]), $rt_createArrayFromData(jl_Object, [$rt_s(127), jur_AbstractCharClass$LazyRange__init_(2560, 2687)]), $rt_createArrayFromData(jl_Object, [$rt_s(128), jur_AbstractCharClass$LazyRange__init_(2688, 2815)]), $rt_createArrayFromData(jl_Object, [$rt_s(129), jur_AbstractCharClass$LazyRange__init_(2816, 2943)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(130), jur_AbstractCharClass$LazyRange__init_(2944, 3071)]), $rt_createArrayFromData(jl_Object, [$rt_s(131), jur_AbstractCharClass$LazyRange__init_(3072, 3199)]), $rt_createArrayFromData(jl_Object, [$rt_s(132), jur_AbstractCharClass$LazyRange__init_(3200, 3327)]), $rt_createArrayFromData(jl_Object, [$rt_s(133), jur_AbstractCharClass$LazyRange__init_(3328, 3455)]), $rt_createArrayFromData(jl_Object, [$rt_s(134), jur_AbstractCharClass$LazyRange__init_(3456, 3583)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(135), jur_AbstractCharClass$LazyRange__init_(3584, 3711)]), $rt_createArrayFromData(jl_Object, [$rt_s(136), jur_AbstractCharClass$LazyRange__init_(3712, 3839)]), $rt_createArrayFromData(jl_Object, [$rt_s(137), jur_AbstractCharClass$LazyRange__init_(3840, 4095)]), $rt_createArrayFromData(jl_Object, [$rt_s(138), jur_AbstractCharClass$LazyRange__init_(4096, 4255)]), $rt_createArrayFromData(jl_Object, [$rt_s(139), jur_AbstractCharClass$LazyRange__init_(4256, 4351)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(140), jur_AbstractCharClass$LazyRange__init_(4352, 4607)]), $rt_createArrayFromData(jl_Object, [$rt_s(141), jur_AbstractCharClass$LazyRange__init_(4608, 4991)]), $rt_createArrayFromData(jl_Object, [$rt_s(142), jur_AbstractCharClass$LazyRange__init_(4992, 5023)]), $rt_createArrayFromData(jl_Object, [$rt_s(143), jur_AbstractCharClass$LazyRange__init_(5024, 5119)]), $rt_createArrayFromData(jl_Object, [$rt_s(144), jur_AbstractCharClass$LazyRange__init_(5120, 5759)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(145), jur_AbstractCharClass$LazyRange__init_(5760, 5791)]), $rt_createArrayFromData(jl_Object, [$rt_s(146), jur_AbstractCharClass$LazyRange__init_(5792, 5887)]), $rt_createArrayFromData(jl_Object, [$rt_s(147), jur_AbstractCharClass$LazyRange__init_(5888, 5919)]), $rt_createArrayFromData(jl_Object, [$rt_s(148), jur_AbstractCharClass$LazyRange__init_(5920, 5951)]), $rt_createArrayFromData(jl_Object, [$rt_s(149), jur_AbstractCharClass$LazyRange__init_(5952, 5983)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(150), jur_AbstractCharClass$LazyRange__init_(5984, 6015)]), $rt_createArrayFromData(jl_Object, [$rt_s(151), jur_AbstractCharClass$LazyRange__init_(6016, 6143)]), $rt_createArrayFromData(jl_Object, [$rt_s(152), jur_AbstractCharClass$LazyRange__init_(6144, 6319)]), $rt_createArrayFromData(jl_Object, [$rt_s(153), jur_AbstractCharClass$LazyRange__init_(6400, 6479)]), $rt_createArrayFromData(jl_Object, [$rt_s(154), jur_AbstractCharClass$LazyRange__init_(6480, 6527)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(155), jur_AbstractCharClass$LazyRange__init_(6528, 6623)]), $rt_createArrayFromData(jl_Object, [$rt_s(156), jur_AbstractCharClass$LazyRange__init_(6624, 6655)]), $rt_createArrayFromData(jl_Object, [$rt_s(157), jur_AbstractCharClass$LazyRange__init_(6656, 6687)]), $rt_createArrayFromData(jl_Object, [$rt_s(158), jur_AbstractCharClass$LazyRange__init_(7424, 7551)]), $rt_createArrayFromData(jl_Object, [$rt_s(159), jur_AbstractCharClass$LazyRange__init_(7552, 7615)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(160), jur_AbstractCharClass$LazyRange__init_(7616, 7679)]), $rt_createArrayFromData(jl_Object, [$rt_s(161), jur_AbstractCharClass$LazyRange__init_(7680, 7935)]), $rt_createArrayFromData(jl_Object, [$rt_s(162), jur_AbstractCharClass$LazyRange__init_(7936, 8191)]), $rt_createArrayFromData(jl_Object, [$rt_s(163), jur_AbstractCharClass$LazyRange__init_(8192, 8303)]), $rt_createArrayFromData(jl_Object, [$rt_s(164), jur_AbstractCharClass$LazyRange__init_(8304, 8351)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(165), jur_AbstractCharClass$LazyRange__init_(8352, 8399)]), $rt_createArrayFromData(jl_Object, [$rt_s(166), jur_AbstractCharClass$LazyRange__init_(8400, 8447)]), $rt_createArrayFromData(jl_Object, [$rt_s(167), jur_AbstractCharClass$LazyRange__init_(8448, 8527)]), $rt_createArrayFromData(jl_Object, [$rt_s(168), jur_AbstractCharClass$LazyRange__init_(8528, 8591)]), $rt_createArrayFromData(jl_Object, [$rt_s(169), jur_AbstractCharClass$LazyRange__init_(8592, 8703)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(170), jur_AbstractCharClass$LazyRange__init_(8704, 8959)]), $rt_createArrayFromData(jl_Object, [$rt_s(171), jur_AbstractCharClass$LazyRange__init_(8960, 9215)]), $rt_createArrayFromData(jl_Object, [$rt_s(172), jur_AbstractCharClass$LazyRange__init_(9216, 9279)]), $rt_createArrayFromData(jl_Object, [$rt_s(173), jur_AbstractCharClass$LazyRange__init_(9280, 9311)]), $rt_createArrayFromData(jl_Object, [$rt_s(174), jur_AbstractCharClass$LazyRange__init_(9312, 9471)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(175), jur_AbstractCharClass$LazyRange__init_(9472, 9599)]), $rt_createArrayFromData(jl_Object, [$rt_s(176), jur_AbstractCharClass$LazyRange__init_(9600, 9631)]), $rt_createArrayFromData(jl_Object, [$rt_s(177), jur_AbstractCharClass$LazyRange__init_(9632, 9727)]), $rt_createArrayFromData(jl_Object, [$rt_s(178), jur_AbstractCharClass$LazyRange__init_(9728, 9983)]), $rt_createArrayFromData(jl_Object, [$rt_s(179), jur_AbstractCharClass$LazyRange__init_(9984, 10175)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(180), jur_AbstractCharClass$LazyRange__init_(10176, 10223)]), $rt_createArrayFromData(jl_Object, [$rt_s(181), jur_AbstractCharClass$LazyRange__init_(10224, 10239)]), $rt_createArrayFromData(jl_Object, [$rt_s(182), jur_AbstractCharClass$LazyRange__init_(10240, 10495)]), $rt_createArrayFromData(jl_Object, [$rt_s(183), jur_AbstractCharClass$LazyRange__init_(10496, 10623)]), $rt_createArrayFromData(jl_Object, [$rt_s(184), jur_AbstractCharClass$LazyRange__init_(10624,
    10751)]), $rt_createArrayFromData(jl_Object, [$rt_s(185), jur_AbstractCharClass$LazyRange__init_(10752, 11007)]), $rt_createArrayFromData(jl_Object, [$rt_s(186), jur_AbstractCharClass$LazyRange__init_(11008, 11263)]), $rt_createArrayFromData(jl_Object, [$rt_s(187), jur_AbstractCharClass$LazyRange__init_(11264, 11359)]), $rt_createArrayFromData(jl_Object, [$rt_s(188), jur_AbstractCharClass$LazyRange__init_(11392, 11519)]), $rt_createArrayFromData(jl_Object, [$rt_s(189), jur_AbstractCharClass$LazyRange__init_(11520,
    11567)]), $rt_createArrayFromData(jl_Object, [$rt_s(190), jur_AbstractCharClass$LazyRange__init_(11568, 11647)]), $rt_createArrayFromData(jl_Object, [$rt_s(191), jur_AbstractCharClass$LazyRange__init_(11648, 11743)]), $rt_createArrayFromData(jl_Object, [$rt_s(192), jur_AbstractCharClass$LazyRange__init_(11776, 11903)]), $rt_createArrayFromData(jl_Object, [$rt_s(193), jur_AbstractCharClass$LazyRange__init_(11904, 12031)]), $rt_createArrayFromData(jl_Object, [$rt_s(194), jur_AbstractCharClass$LazyRange__init_(12032,
    12255)]), $rt_createArrayFromData(jl_Object, [$rt_s(195), jur_AbstractCharClass$LazyRange__init_(12272, 12287)]), $rt_createArrayFromData(jl_Object, [$rt_s(196), jur_AbstractCharClass$LazyRange__init_(12288, 12351)]), $rt_createArrayFromData(jl_Object, [$rt_s(197), jur_AbstractCharClass$LazyRange__init_(12352, 12447)]), $rt_createArrayFromData(jl_Object, [$rt_s(198), jur_AbstractCharClass$LazyRange__init_(12448, 12543)]), $rt_createArrayFromData(jl_Object, [$rt_s(199), jur_AbstractCharClass$LazyRange__init_(12544,
    12591)]), $rt_createArrayFromData(jl_Object, [$rt_s(200), jur_AbstractCharClass$LazyRange__init_(12592, 12687)]), $rt_createArrayFromData(jl_Object, [$rt_s(201), jur_AbstractCharClass$LazyRange__init_(12688, 12703)]), $rt_createArrayFromData(jl_Object, [$rt_s(202), jur_AbstractCharClass$LazyRange__init_(12704, 12735)]), $rt_createArrayFromData(jl_Object, [$rt_s(203), jur_AbstractCharClass$LazyRange__init_(12736, 12783)]), $rt_createArrayFromData(jl_Object, [$rt_s(204), jur_AbstractCharClass$LazyRange__init_(12784,
    12799)]), $rt_createArrayFromData(jl_Object, [$rt_s(205), jur_AbstractCharClass$LazyRange__init_(12800, 13055)]), $rt_createArrayFromData(jl_Object, [$rt_s(206), jur_AbstractCharClass$LazyRange__init_(13056, 13311)]), $rt_createArrayFromData(jl_Object, [$rt_s(207), jur_AbstractCharClass$LazyRange__init_(13312, 19893)]), $rt_createArrayFromData(jl_Object, [$rt_s(208), jur_AbstractCharClass$LazyRange__init_(19904, 19967)]), $rt_createArrayFromData(jl_Object, [$rt_s(209), jur_AbstractCharClass$LazyRange__init_(19968,
    40959)]), $rt_createArrayFromData(jl_Object, [$rt_s(210), jur_AbstractCharClass$LazyRange__init_(40960, 42127)]), $rt_createArrayFromData(jl_Object, [$rt_s(211), jur_AbstractCharClass$LazyRange__init_(42128, 42191)]), $rt_createArrayFromData(jl_Object, [$rt_s(212), jur_AbstractCharClass$LazyRange__init_(42752, 42783)]), $rt_createArrayFromData(jl_Object, [$rt_s(213), jur_AbstractCharClass$LazyRange__init_(43008, 43055)]), $rt_createArrayFromData(jl_Object, [$rt_s(214), jur_AbstractCharClass$LazyRange__init_(44032,
    55203)]), $rt_createArrayFromData(jl_Object, [$rt_s(215), jur_AbstractCharClass$LazyRange__init_(55296, 56191)]), $rt_createArrayFromData(jl_Object, [$rt_s(216), jur_AbstractCharClass$LazyRange__init_(56192, 56319)]), $rt_createArrayFromData(jl_Object, [$rt_s(217), jur_AbstractCharClass$LazyRange__init_(56320, 57343)]), $rt_createArrayFromData(jl_Object, [$rt_s(218), jur_AbstractCharClass$LazyRange__init_(57344, 63743)]), $rt_createArrayFromData(jl_Object, [$rt_s(219), jur_AbstractCharClass$LazyRange__init_(63744,
    64255)]), $rt_createArrayFromData(jl_Object, [$rt_s(220), jur_AbstractCharClass$LazyRange__init_(64256, 64335)]), $rt_createArrayFromData(jl_Object, [$rt_s(221), jur_AbstractCharClass$LazyRange__init_(64336, 65023)]), $rt_createArrayFromData(jl_Object, [$rt_s(222), jur_AbstractCharClass$LazyRange__init_(65024, 65039)]), $rt_createArrayFromData(jl_Object, [$rt_s(223), jur_AbstractCharClass$LazyRange__init_(65040, 65055)]), $rt_createArrayFromData(jl_Object, [$rt_s(224), jur_AbstractCharClass$LazyRange__init_(65056,
    65071)]), $rt_createArrayFromData(jl_Object, [$rt_s(225), jur_AbstractCharClass$LazyRange__init_(65072, 65103)]), $rt_createArrayFromData(jl_Object, [$rt_s(226), jur_AbstractCharClass$LazyRange__init_(65104, 65135)]), $rt_createArrayFromData(jl_Object, [$rt_s(227), jur_AbstractCharClass$LazyRange__init_(65136, 65279)]), $rt_createArrayFromData(jl_Object, [$rt_s(228), jur_AbstractCharClass$LazyRange__init_(65280, 65519)]), $rt_createArrayFromData(jl_Object, [$rt_s(229), jur_AbstractCharClass$LazyRange__init_(0,
    1114111)]), $rt_createArrayFromData(jl_Object, [$rt_s(230), jur_AbstractCharClass$LazySpecialsBlock__init_()]), $rt_createArrayFromData(jl_Object, [$rt_s(231), jur_AbstractCharClass$LazyCategory__init_(0, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(232), jur_AbstractCharClass$LazyCategoryScope__init_(62, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(233), jur_AbstractCharClass$LazyCategory__init_(1, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(234), jur_AbstractCharClass$LazyCategory__init_(2, 1)]),
    $rt_createArrayFromData(jl_Object, [$rt_s(235), jur_AbstractCharClass$LazyCategory__init_(3, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(236), jur_AbstractCharClass$LazyCategory__init_(4, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(237), jur_AbstractCharClass$LazyCategory__init_(5, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(238), jur_AbstractCharClass$LazyCategoryScope__init_(448, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(239), jur_AbstractCharClass$LazyCategory__init_(6, 1)]), $rt_createArrayFromData(jl_Object,
    [$rt_s(240), jur_AbstractCharClass$LazyCategory__init_(7, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(241), jur_AbstractCharClass$LazyCategory__init_(8, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(242), jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(243), jur_AbstractCharClass$LazyCategory__init_(9, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(244), jur_AbstractCharClass$LazyCategory__init_(10, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(245),
    jur_AbstractCharClass$LazyCategory__init_(11, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(246), jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(247), jur_AbstractCharClass$LazyCategory__init_(12, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(248), jur_AbstractCharClass$LazyCategory__init_(13, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(249), jur_AbstractCharClass$LazyCategory__init_(14, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(250), jur_AbstractCharClass$LazyCategoryScope__init_0(983040,
    1, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(251), jur_AbstractCharClass$LazyCategory__init_(15, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(252), jur_AbstractCharClass$LazyCategory__init_(16, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(253), jur_AbstractCharClass$LazyCategory__init_(18, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(254), jur_AbstractCharClass$LazyCategory__init_0(19, 0, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(255), jur_AbstractCharClass$LazyCategoryScope__init_(1643118592,
    1)]), $rt_createArrayFromData(jl_Object, [$rt_s(256), jur_AbstractCharClass$LazyCategory__init_(20, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(257), jur_AbstractCharClass$LazyCategory__init_(21, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(258), jur_AbstractCharClass$LazyCategory__init_(22, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(259), jur_AbstractCharClass$LazyCategory__init_(23, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(260), jur_AbstractCharClass$LazyCategory__init_(24, 1)]), $rt_createArrayFromData(jl_Object,
    [$rt_s(261), jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(262), jur_AbstractCharClass$LazyCategory__init_(25, 1)]), $rt_createArrayFromData(jl_Object, [$rt_s(263), jur_AbstractCharClass$LazyCategory__init_(26, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(264), jur_AbstractCharClass$LazyCategory__init_(27, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(265), jur_AbstractCharClass$LazyCategory__init_(28, 1)]), $rt_createArrayFromData(jl_Object,
    [$rt_s(266), jur_AbstractCharClass$LazyCategory__init_(29, 0)]), $rt_createArrayFromData(jl_Object, [$rt_s(267), jur_AbstractCharClass$LazyCategory__init_(30, 0)])]);
}
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
function jur_UCISupplCharSet_accepts($this, $strIndex, $testString) {
    var $low, var$4, var$5, $high;
    $low = $strIndex + 1 | 0;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        var$5 = var$4.length;
        if ($strIndex < var$5) {
            $high = var$4[$strIndex];
            if ($low >= 0 && $low < var$5) {
                $low = var$4[$low];
                return $this.$ch2 != (String.fromCharCode((String.fromCharCode((($high & 1023) << 10 | $low & 1023) + 65536 | 0)).toUpperCase().charCodeAt(0))).toLowerCase().charCodeAt(0) ? (-1) : 2;
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
function jur_LowSurrogateCharSet__init_(var_0) {
    var var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_LowSurrogateCharSet__init_0($this, $low) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$low = $low;
}
function jur_LowSurrogateCharSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_LowSurrogateCharSet_matches($this, $stringIndex, $testString, $matchResult) {
    var var$4, var$5, var$6, $low, $high;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    if ($stringIndex >= 0) {
        var$5 = $testString.$characters.data;
        var$6 = var$5.length;
        if ($stringIndex < var$6) {
            a: {
                $low = var$5[$stringIndex];
                if ($stringIndex > $matchResult.$leftBound) {
                    $high = $stringIndex - 1 | 0;
                    if ($high >= 0 && $high < var$6) {
                        if (!((var$5[$high] & 64512) != 55296 ? 0 : 1))
                            break a;
                        return (-1);
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            if ($this.$low != $low)
                return (-1);
            return $this.$next0.$matches(var$4, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_LowSurrogateCharSet_find($this, $strIndex, $testStr, $matchResult) {
    var var$4, $startStr, $strLength, var$7, var$8, var$9;
    if (!($testStr instanceof jl_String)) {
        var$4 = $matchResult.$rightBound;
        a: {
            while (true) {
                if ($strIndex > var$4) {
                    $strIndex = (-1);
                    break a;
                }
                if (jur_LowSurrogateCharSet_matches($this, $strIndex, $testStr, $matchResult) >= 0)
                    break;
                $strIndex = $strIndex + 1 | 0;
            }
        }
        return $strIndex;
    }
    $startStr = $matchResult.$leftBound;
    $strLength = $matchResult.$rightBound;
    b: {
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$7 = jl_String_indexOf($testStr, $this.$low, $strIndex);
            if (var$7 < 0)
                return (-1);
            if (var$7 > $startStr) {
                $strIndex = var$7 - 1 | 0;
                if ($strIndex < 0)
                    break b;
                var$8 = $testStr.$characters.data;
                if ($strIndex >= var$8.length)
                    break b;
                if ((var$8[$strIndex] & 64512) != 55296 ? 0 : 1) {
                    $strIndex = var$7 + 1 | 0;
                    continue;
                }
            }
            var$9 = $this.$next0;
            $strIndex = var$7 + 1 | 0;
            if (var$9.$matches($strIndex, $testStr, $matchResult) >= 0)
                break;
        }
        return var$7;
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    $testStr.$suppressionEnabled = 1;
    $testStr.$writableStackTrace = 1;
    $rt_throw($testStr);
}
function jur_LowSurrogateCharSet_findBack($this, $strIndex, $lastIndex, $testStr, $matchResult) {
    var $startStr, var$6, var$7;
    if (!($testStr instanceof jl_String)) {
        a: {
            while (true) {
                if ($lastIndex < $strIndex) {
                    $lastIndex = (-1);
                    break a;
                }
                if (jur_LowSurrogateCharSet_matches($this, $lastIndex, $testStr, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
        }
        return $lastIndex;
    }
    $startStr = $matchResult.$leftBound;
    b: {
        c: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                var$6 = jl_String_lastIndexOf($testStr, $this.$low, $lastIndex);
                if (var$6 < 0)
                    break c;
                if (var$6 < $strIndex)
                    break c;
                if (var$6 > $startStr) {
                    $lastIndex = var$6 - 1 | 0;
                    if ($lastIndex < 0)
                        break b;
                    var$7 = $testStr.$characters.data;
                    if ($lastIndex >= var$7.length)
                        break b;
                    if ((var$7[$lastIndex] & 64512) != 55296 ? 0 : 1) {
                        $lastIndex = var$6 + (-2) | 0;
                        continue;
                    }
                }
                if ($this.$next0.$matches(var$6 + 1 | 0, $testStr, $matchResult) >= 0)
                    break;
                $lastIndex = var$6 + (-1) | 0;
            }
            return var$6;
        }
        return (-1);
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    $testStr.$suppressionEnabled = 1;
    $testStr.$writableStackTrace = 1;
    $rt_throw($testStr);
}
function jur_LowSurrogateCharSet_first($this, $set) {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_HighSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_LowSurrogateCharSet))
        return 1;
    return $set.$low != $this.$low ? 0 : 1;
}
function jur_LowSurrogateCharSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
function jur_HighSurrogateCharSet__init_(var_0) {
    var var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_HighSurrogateCharSet__init_0($this, $high) {
    var var$2, var$3;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$high = $high;
}
function jur_HighSurrogateCharSet_setNext($this, $next) {
    $this.$next0 = $next;
}
function jur_HighSurrogateCharSet_matches($this, $stringIndex, $testString, $matchResult) {
    var $strLength, var$5, var$6, $low, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    $strLength = $rt_compare(var$5, $strLength);
    if ($strLength > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    if ($stringIndex >= 0) {
        var$6 = $testString.$characters.data;
        $low = var$6.length;
        if ($stringIndex < $low) {
            a: {
                $high = var$6[$stringIndex];
                if ($strLength < 0) {
                    if (var$5 >= 0 && var$5 < $low) {
                        if (!((var$6[var$5] & 64512) != 56320 ? 0 : 1))
                            break a;
                        return (-1);
                    }
                    $testString = new jl_StringIndexOutOfBoundsException;
                    $testString.$suppressionEnabled = 1;
                    $testString.$writableStackTrace = 1;
                    $rt_throw($testString);
                }
            }
            if ($this.$high != $high)
                return (-1);
            return $this.$next0.$matches(var$5, $testString, $matchResult);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_HighSurrogateCharSet_find($this, $strIndex, $testStr, $matchResult) {
    var $strLength, var$5, var$6;
    if (!($testStr instanceof jl_String)) {
        $strLength = $matchResult.$rightBound;
        a: {
            while (true) {
                if ($strIndex > $strLength) {
                    $strIndex = (-1);
                    break a;
                }
                if (jur_HighSurrogateCharSet_matches($this, $strIndex, $testStr, $matchResult) >= 0)
                    break;
                $strIndex = $strIndex + 1 | 0;
            }
        }
        return $strIndex;
    }
    $strLength = $matchResult.$rightBound;
    b: {
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$5 = jl_String_indexOf($testStr, $this.$high, $strIndex);
            if (var$5 < 0)
                return (-1);
            $strIndex = var$5 + 1 | 0;
            if ($strIndex < $strLength) {
                if ($strIndex < 0)
                    break b;
                var$6 = $testStr.$characters.data;
                if ($strIndex >= var$6.length)
                    break b;
                if ((var$6[$strIndex] & 64512) != 56320 ? 0 : 1) {
                    $strIndex = var$5 + 2 | 0;
                    continue;
                }
            }
            if ($this.$next0.$matches($strIndex, $testStr, $matchResult) >= 0)
                break;
        }
        return var$5;
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    $testStr.$suppressionEnabled = 1;
    $testStr.$writableStackTrace = 1;
    $rt_throw($testStr);
}
function jur_HighSurrogateCharSet_findBack($this, $strIndex, $lastIndex, $testStr, $matchResult) {
    var $strLength, var$6, var$7;
    if (!($testStr instanceof jl_String)) {
        a: {
            while (true) {
                if ($lastIndex < $strIndex) {
                    $lastIndex = (-1);
                    break a;
                }
                if (jur_HighSurrogateCharSet_matches($this, $lastIndex, $testStr, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
        }
        return $lastIndex;
    }
    $strLength = $matchResult.$rightBound;
    b: {
        c: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                var$6 = jl_String_lastIndexOf($testStr, $this.$high, $lastIndex);
                if (var$6 < 0)
                    break c;
                if (var$6 < $strIndex)
                    break c;
                $lastIndex = var$6 + 1 | 0;
                if ($lastIndex < $strLength) {
                    if ($lastIndex < 0)
                        break b;
                    var$7 = $testStr.$characters.data;
                    if ($lastIndex >= var$7.length)
                        break b;
                    if ((var$7[$lastIndex] & 64512) != 56320 ? 0 : 1) {
                        $lastIndex = var$6 + (-1) | 0;
                        continue;
                    }
                }
                if ($this.$next0.$matches($lastIndex, $testStr, $matchResult) >= 0)
                    break;
                $lastIndex = var$6 + (-1) | 0;
            }
            return var$6;
        }
        return (-1);
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    $testStr.$suppressionEnabled = 1;
    $testStr.$writableStackTrace = 1;
    $rt_throw($testStr);
}
function jur_HighSurrogateCharSet_first($this, $set) {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_LowSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_HighSurrogateCharSet))
        return 1;
    return $set.$high != $this.$high ? 0 : 1;
}
function jur_HighSurrogateCharSet_hasConsumed($this, $matchResult) {
    return 1;
}
function jur_SupplCharSet() {
    var a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch4 = 0;
}
function jur_SupplCharSet__init_(var_0) {
    var var_1 = new jur_SupplCharSet();
    jur_SupplCharSet__init_0(var_1, var_0);
    return var_1;
}
function jur_SupplCharSet__init_0($this, $ch) {
    var var$2, var$3, $chUTF16;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    var$3 = new jl_AbstractStringBuilder;
    var$3.$buffer = $rt_createCharArray(20);
    $this.$index1 = (jl_AbstractStringBuilder_insert0(var$3, var$3.$length, var$2, 10)).$toString();
    $this.$charCount = 1;
    $this.$charCount = 2;
    $this.$ch4 = $ch;
    if ($ch < 65536) {
        $chUTF16 = $rt_createCharArray(1);
        $chUTF16.data[0] = $ch & 65535;
    } else
        $chUTF16 = $rt_createCharArrayFromData([(55296 | ($ch - 65536 | 0) >> 10 & 1023) & 65535, (56320 | $ch & 1023) & 65535]);
    $chUTF16 = $chUTF16.data;
    $this.$high0 = $chUTF16[0];
    $this.$low0 = $chUTF16[1];
}
function jur_SupplCharSet_accepts($this, $strIndex, $testString) {
    var $low, var$4, var$5, $high;
    $low = $strIndex + 1 | 0;
    if ($strIndex >= 0) {
        var$4 = $testString.$characters.data;
        var$5 = var$4.length;
        if ($strIndex < var$5) {
            $high = var$4[$strIndex];
            if ($low >= 0 && $low < var$5) {
                $low = var$4[$low];
                return $this.$high0 == $high && $this.$low0 == $low ? 2 : (-1);
            }
            $testString = new jl_StringIndexOutOfBoundsException;
            $testString.$suppressionEnabled = 1;
            $testString.$writableStackTrace = 1;
            $rt_throw($testString);
        }
    }
    $testString = new jl_StringIndexOutOfBoundsException;
    $testString.$suppressionEnabled = 1;
    $testString.$writableStackTrace = 1;
    $rt_throw($testString);
}
function jur_SupplCharSet_find($this, $strIndex, $testStr, $matchResult) {
    var $strLength, var$5, $ch, var$7, var$8;
    if ($testStr instanceof jl_String) {
        $strLength = $matchResult.$rightBound;
        a: {
            while ($strIndex < $strLength) {
                $strIndex = jl_String_indexOf($testStr, $this.$high0, $strIndex);
                if ($strIndex < 0)
                    return (-1);
                $strIndex = $strIndex + 1 | 0;
                if ($strIndex >= $strLength)
                    continue;
                if ($strIndex < 0)
                    break a;
                var$5 = $testStr.$characters.data;
                if ($strIndex >= var$5.length)
                    break a;
                $ch = var$5[$strIndex];
                if ($this.$low0 == $ch && $this.$next0.$matches($strIndex + 1 | 0, $testStr, $matchResult) >= 0)
                    return $strIndex + (-1) | 0;
                $strIndex = $strIndex + 1 | 0;
            }
            return (-1);
        }
        $testStr = new jl_StringIndexOutOfBoundsException;
        $testStr.$suppressionEnabled = 1;
        $testStr.$writableStackTrace = 1;
        $rt_throw($testStr);
    }
    var$7 = $matchResult.$rightBound;
    b: {
        c: {
            d: {
                while (true) {
                    if ($strIndex > var$7) {
                        $strIndex = (-1);
                        break d;
                    }
                    if (($strIndex + $this.$charCount | 0) > $matchResult.$rightBound) {
                        $matchResult.$hitEnd = 1;
                        $ch = (-1);
                    } else {
                        $ch = $strIndex + 1 | 0;
                        if ($strIndex < 0)
                            break b;
                        var$5 = $testStr.$characters.data;
                        $strLength = var$5.length;
                        if ($strIndex >= $strLength)
                            break b;
                        var$8 = var$5[$strIndex];
                        if ($ch < 0)
                            break c;
                        if ($ch >= $strLength)
                            break c;
                        $strLength = var$5[$ch];
                        $ch = $this.$high0 == var$8 && $this.$low0 == $strLength ? 2 : (-1);
                        $ch = $ch < 0 ? (-1) : $this.$next0.$matches($strIndex + $ch | 0, $testStr, $matchResult);
                    }
                    if ($ch >= 0)
                        break;
                    $strIndex = $strIndex + 1 | 0;
                }
            }
            return $strIndex;
        }
        $testStr = new jl_StringIndexOutOfBoundsException;
        jl_Throwable__init_0($testStr);
        $rt_throw($testStr);
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0($testStr);
    $rt_throw($testStr);
}
function jur_SupplCharSet_findBack($this, $strIndex, $lastIndex, $testStr, $matchResult) {
    var var$5, var$6, var$7, var$8, var$9;
    if ($testStr instanceof jl_String) {
        a: {
            b: {
                while (true) {
                    if ($lastIndex < $strIndex)
                        return (-1);
                    $lastIndex = jl_String_lastIndexOf($testStr, $this.$low0, $lastIndex) + (-1) | 0;
                    if ($lastIndex < 0)
                        break b;
                    if ($lastIndex < $strIndex)
                        break b;
                    var$5 = $this.$high0;
                    if ($lastIndex < 0)
                        break a;
                    var$6 = $testStr.$characters.data;
                    if ($lastIndex >= var$6.length)
                        break a;
                    if (var$5 == var$6[$lastIndex] && $this.$next0.$matches($lastIndex + 2 | 0, $testStr, $matchResult) >= 0)
                        break;
                    $lastIndex = $lastIndex + (-1) | 0;
                }
                return $lastIndex;
            }
            return (-1);
        }
        $testStr = new jl_StringIndexOutOfBoundsException;
        $testStr.$suppressionEnabled = 1;
        $testStr.$writableStackTrace = 1;
        $rt_throw($testStr);
    }
    c: {
        d: {
            e: {
                while (true) {
                    if ($lastIndex < $strIndex) {
                        $lastIndex = (-1);
                        break e;
                    }
                    if (($lastIndex + $this.$charCount | 0) > $matchResult.$rightBound) {
                        $matchResult.$hitEnd = 1;
                        var$5 = (-1);
                    } else {
                        var$7 = $lastIndex + 1 | 0;
                        if ($lastIndex < 0)
                            break c;
                        var$6 = $testStr.$characters.data;
                        var$5 = var$6.length;
                        if ($lastIndex >= var$5)
                            break c;
                        var$8 = var$6[$lastIndex];
                        if (var$7 < 0)
                            break d;
                        if (var$7 >= var$5)
                            break d;
                        var$9 = var$6[var$7];
                        var$5 = $this.$high0 == var$8 && $this.$low0 == var$9 ? 2 : (-1);
                        var$5 = var$5 < 0 ? (-1) : $this.$next0.$matches($lastIndex + var$5 | 0, $testStr, $matchResult);
                    }
                    if (var$5 >= 0)
                        break;
                    $lastIndex = $lastIndex + (-1) | 0;
                }
            }
            return $lastIndex;
        }
        $testStr = new jl_StringIndexOutOfBoundsException;
        jl_Throwable__init_0($testStr);
        $rt_throw($testStr);
    }
    $testStr = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0($testStr);
    $rt_throw($testStr);
}
function jur_SupplCharSet_first($this, $set) {
    if ($set instanceof jur_SupplCharSet)
        return $set.$ch4 != $this.$ch4 ? 0 : 1;
    if ($set instanceof jur_SupplRangeSet)
        return $set.$contains($this.$ch4);
    if ($set instanceof jur_CharSet)
        return 0;
    if (!($set instanceof jur_RangeSet))
        return 1;
    return 0;
}
var jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator);
function jur_AbstractLineTerminator$1_isLineTerminator($this, $ch) {
    return $ch != 10 ? 0 : 1;
}
function jur_AbstractLineTerminator$1_isAfterLineTerminator($this, $ch, $ch2) {
    return $ch != 10 ? 0 : 1;
}
var jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator);
function jur_AbstractLineTerminator$2_isLineTerminator($this, $ch) {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
}
function jur_AbstractLineTerminator$2_isAfterLineTerminator($this, $ch, $ch2) {
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
}
function jur_SequenceSet$IntHash() {
    var a = this; jl_Object.call(a);
    a.$table = null;
    a.$values = null;
    a.$mask = 0;
    a.$size1 = 0;
}
function jur_SequenceSet$IntHash__init_(var_0) {
    var var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
}
function jur_SequenceSet$IntHash__init_0($this, $size) {
    var var$2, var$3;
    while (true) {
        var$2 = $this.$mask;
        if ($size < var$2)
            break;
        $this.$mask = var$2 << 1 | 1;
    }
    var$3 = var$2 << 1 | 1;
    $this.$mask = var$3;
    var$3 = var$3 + 1 | 0;
    $this.$table = $rt_createIntArray(var$3);
    $this.$values = $rt_createIntArray(var$3);
    $this.$size1 = $size;
}
function jur_SequenceSet$IntHash_put($this, $key, $value) {
    var $i, var$4, $hashCode, var$6;
    $i = 0;
    var$4 = $this.$mask;
    $hashCode = $key & var$4;
    while (true) {
        var$6 = $this.$table.data;
        if (!var$6[$hashCode])
            break;
        if (var$6[$hashCode] == $key)
            break;
        $i = ($i + 1 | 0) & var$4;
        $hashCode = ($hashCode + $i | 0) & var$4;
    }
    var$6[$hashCode] = $key;
    $this.$values.data[$hashCode] = $value;
}
function jur_SequenceSet$IntHash_get($this, $key) {
    var var$2, $hashCode, $i, $storedKey;
    var$2 = $this.$mask;
    $hashCode = $key & var$2;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values.data[$hashCode];
        $i = ($i + 1 | 0) & var$2;
        $hashCode = ($hashCode + $i | 0) & var$2;
    }
    return $this.$size1;
}
var jur_IntHash = $rt_classWithoutFields();
var jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazySpace__init_() {
    var var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazySpace__init_0($this) {}
function jur_AbstractCharClass$LazySpace_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add(jur_CharClass_add0(var$1, 9, 13), 32);
}
var jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyDigit__init_() {
    var var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyDigit__init_0($this) {}
function jur_AbstractCharClass$LazyDigit_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(var$1, 48, 57);
}
var jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyLower__init_() {
    var var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyLower__init_0($this) {}
function jur_AbstractCharClass$LazyLower_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(var$1, 97, 122);
}
var jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyUpper__init_() {
    var var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyUpper__init_0($this) {}
function jur_AbstractCharClass$LazyUpper_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(var$1, 65, 90);
}
var jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyASCII__init_() {
    var var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyASCII__init_0($this) {}
function jur_AbstractCharClass$LazyASCII_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(var$1, 0, 127);
}
var jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyAlpha__init_() {
    var var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyAlpha__init_0($this) {}
function jur_AbstractCharClass$LazyAlpha_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(var$1, 97, 122), 65, 90);
}
var jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha);
function jur_AbstractCharClass$LazyAlnum__init_() {
    var var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyAlnum__init_0($this) {}
function jur_AbstractCharClass$LazyAlnum_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 97, 122), 65, 90), 48, 57);
}
var jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyPunct__init_() {
    var var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyPunct__init_0($this) {}
function jur_AbstractCharClass$LazyPunct_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 33, 64), 91, 96), 123, 126);
}
var jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum);
function jur_AbstractCharClass$LazyGraph__init_() {
    var var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyGraph__init_0($this) {}
function jur_AbstractCharClass$LazyGraph_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 97, 122), 65, 90), 48, 57), 33, 64), 91, 96), 123, 126);
}
var jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph);
function jur_AbstractCharClass$LazyPrint__init_() {
    var var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyPrint__init_0($this) {}
function jur_AbstractCharClass$LazyPrint_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 97, 122), 65, 90), 48, 57), 33, 64), 91, 96), 123, 126), 32);
}
var jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyBlank__init_() {
    var var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyBlank__init_0($this) {}
function jur_AbstractCharClass$LazyBlank_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add(jur_CharClass_add(var$1, 32), 9);
}
var jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyCntrl__init_() {
    var var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyCntrl__init_0($this) {}
function jur_AbstractCharClass$LazyCntrl_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add(jur_CharClass_add0(var$1, 0, 31), 127);
}
var jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyXDigit__init_() {
    var var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyXDigit__init_0($this) {}
function jur_AbstractCharClass$LazyXDigit_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 48, 57), 97, 102), 65, 70);
}
var jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaLowerCase__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaLowerCase__init_0($this) {}
function jur_AbstractCharClass$LazyJavaLowerCase_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaLowerCase$1;
    $chCl.$this$019 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaUpperCase__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaUpperCase__init_0($this) {}
function jur_AbstractCharClass$LazyJavaUpperCase_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaUpperCase$1;
    $chCl.$this$020 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaWhitespace__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaWhitespace__init_0($this) {}
function jur_AbstractCharClass$LazyJavaWhitespace_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_AbstractCharClass$LazyJavaWhitespace$1;
    var$1.$this$021 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    return var$1;
}
var jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaMirrored__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaMirrored__init_0($this) {}
function jur_AbstractCharClass$LazyJavaMirrored_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_AbstractCharClass$LazyJavaMirrored$1;
    var$1.$this$022 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    return var$1;
}
var jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaDefined__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaDefined__init_0($this) {}
function jur_AbstractCharClass$LazyJavaDefined_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaDefined$1;
    $chCl.$this$023 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    ju_BitSet_set0(var$2, 0, 2048);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaDigit__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaDigit__init_0($this) {}
function jur_AbstractCharClass$LazyJavaDigit_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaDigit$1;
    $chCl.$this$024 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0($this) {}
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1;
    $chCl.$this$025 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaISOControl__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaISOControl__init_0($this) {}
function jur_AbstractCharClass$LazyJavaISOControl_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_AbstractCharClass$LazyJavaISOControl$1;
    var$1.$this$026 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    return var$1;
}
var jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0($this) {}
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1;
    $chCl.$this$027 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0($this) {}
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1;
    $chCl.$this$028 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaLetter__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaLetter__init_0($this) {}
function jur_AbstractCharClass$LazyJavaLetter_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaLetter$1;
    $chCl.$this$029 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaLetterOrDigit__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0($this) {}
function jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1;
    $chCl.$this$030 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaSpaceChar__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaSpaceChar__init_0($this) {}
function jur_AbstractCharClass$LazyJavaSpaceChar_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1;
    var$1.$this$031 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    return var$1;
}
var jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaTitleCase__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaTitleCase__init_0($this) {}
function jur_AbstractCharClass$LazyJavaTitleCase_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_AbstractCharClass$LazyJavaTitleCase$1;
    var$1.$this$032 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    return var$1;
}
var jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0($this) {}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1;
    $chCl.$this$033 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_() {
    var var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0($this) {}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1;
    $chCl.$this$034 = $this;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazyWord__init_() {
    var var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyWord__init_0($this) {}
function jur_AbstractCharClass$LazyWord_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0(var$1, 97, 122), 65, 90), 48, 57), 95);
}
var jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord);
function jur_AbstractCharClass$LazyNonWord__init_() {
    var var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyNonWord__init_0($this) {}
function jur_AbstractCharClass$LazyNonWord_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    $chCl.$bits = var$2;
    $chCl = jur_AbstractCharClass_setNegative(jur_CharClass_add(jur_CharClass_add0(jur_CharClass_add0(jur_CharClass_add0($chCl, 97, 122), 65, 90), 48, 57), 95), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace);
function jur_AbstractCharClass$LazyNonSpace__init_() {
    var var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyNonSpace__init_0($this) {}
function jur_AbstractCharClass$LazyNonSpace_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    $chCl.$bits = var$2;
    $chCl = jur_AbstractCharClass_setNegative(jur_CharClass_add(jur_CharClass_add0($chCl, 9, 13), 32), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
var jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit);
function jur_AbstractCharClass$LazyNonDigit__init_() {
    var var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazyNonDigit__init_0($this) {}
function jur_AbstractCharClass$LazyNonDigit_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    $chCl.$bits = var$2;
    $chCl = jur_AbstractCharClass_setNegative(jur_CharClass_add0($chCl, 48, 57), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
}
function jur_AbstractCharClass$LazyRange() {
    var a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start3 = 0;
    a.$end0 = 0;
}
function jur_AbstractCharClass$LazyRange__init_(var_0, var_1) {
    var var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_AbstractCharClass$LazyRange__init_0($this, $start, $end) {
    $this.$start3 = $start;
    $this.$end0 = $end;
}
function jur_AbstractCharClass$LazyRange_computeValue($this) {
    var $chCl, var$2;
    $chCl = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    $chCl.$bits = var$2;
    return jur_CharClass_add0($chCl, $this.$start3, $this.$end0);
}
var jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass);
function jur_AbstractCharClass$LazySpecialsBlock__init_() {
    var var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_0(var_0);
    return var_0;
}
function jur_AbstractCharClass$LazySpecialsBlock__init_0($this) {}
function jur_AbstractCharClass$LazySpecialsBlock_computeValue($this) {
    var var$1, var$2;
    var$1 = new jur_CharClass;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(64);
    var$1.$lowHighSurrogates = var$2;
    var$2 = new ju_BitSet;
    var$2.$data0 = $rt_createIntArray(0);
    var$1.$bits = var$2;
    return jur_CharClass_add0(jur_CharClass_add0(var$1, 65279, 65279), 65520, 65533);
}
function jur_AbstractCharClass$LazyCategory() {
    var a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category = 0;
    a.$mayContainSupplCodepoints0 = 0;
    a.$containsAllSurrogates = 0;
}
function jur_AbstractCharClass$LazyCategory__init_(var_0, var_1) {
    var var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_2, var_0, var_1);
    return var_2;
}
function jur_AbstractCharClass$LazyCategory__init_0(var_0, var_1, var_2) {
    var var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_AbstractCharClass$LazyCategory__init_1($this, $cat, $mayContainSupplCodepoints) {
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category = $cat;
}
function jur_AbstractCharClass$LazyCategory__init_2($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) {
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category = $cat;
}
function jur_AbstractCharClass$LazyCategory_computeValue($this) {
    var $chCl, var$2, var$3;
    $chCl = new jur_UnicodeCategory;
    var$2 = $this.$category;
    var$3 = new ju_BitSet;
    var$3.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$3;
    $chCl.$category0 = var$2;
    if ($this.$containsAllSurrogates)
        ju_BitSet_set0(var$3, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints0;
    return $chCl;
}
function jur_AbstractCharClass$LazyCategoryScope() {
    var a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates0 = 0;
}
function jur_AbstractCharClass$LazyCategoryScope__init_(var_0, var_1) {
    var var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
}
function jur_AbstractCharClass$LazyCategoryScope__init_0(var_0, var_1, var_2) {
    var var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jur_AbstractCharClass$LazyCategoryScope__init_1($this, $cat, $mayContainSupplCodepoints) {
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
}
function jur_AbstractCharClass$LazyCategoryScope__init_2($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) {
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
}
function jur_AbstractCharClass$LazyCategoryScope_computeValue($this) {
    var $chCl, var$2, var$3;
    $chCl = new jur_UnicodeCategoryScope;
    var$2 = $this.$category1;
    var$3 = new ju_BitSet;
    var$3.$data0 = $rt_createIntArray(64);
    $chCl.$lowHighSurrogates = var$3;
    $chCl.$category0 = var$2;
    if ($this.$containsAllSurrogates0)
        ju_BitSet_set0(var$3, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints1;
    return $chCl;
}
var otpp_ResourceAccessor = $rt_classWithoutFields();
var otciu_UnicodeHelper = $rt_classWithoutFields();
function otciu_UnicodeHelper_decodeIntPairsDiff($text) {
    var $flow, $data, var$4, var$5, $sz, $j, $lastKey, $lastValue, $i, var$11, var$12;
    $flow = new otci_CharFlow;
    $data = $text.$characters.data;
    var$4 = $rt_createCharArray($data.length);
    var$5 = var$4.data;
    $sz = 0;
    $j = var$5.length;
    while ($sz < $j) {
        var$5[$sz] = $data[$sz];
        $sz = $sz + 1 | 0;
    }
    $flow.$characters0 = var$4;
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    var$4 = $data.data;
    $j = 0;
    $lastKey = 0;
    $lastValue = 0;
    $i = 0;
    while ($i < $sz) {
        var$11 = otci_Base46_decodeUnsigned($flow);
        var$12 = var$11 / 2 | 0;
        if (var$11 % 2 | 0)
            var$12 =  -var$12 | 0;
        $lastKey = $lastKey + var$12 | 0;
        var$11 = otci_Base46_decodeUnsigned($flow);
        var$12 = var$11 / 2 | 0;
        if (var$11 % 2 | 0)
            var$12 =  -var$12 | 0;
        $lastValue = $lastValue + var$12 | 0;
        var$12 = $j + 1 | 0;
        var$4[$j] = $lastKey;
        $j = var$12 + 1 | 0;
        var$4[var$12] = $lastValue;
        $i = $i + 1 | 0;
    }
    return $data;
}
function otciu_UnicodeHelper_decodeByte($c) {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
}
function otciu_UnicodeHelper_extractRle($encoded) {
    var $ranges, var$3, var$4, $index, $rangeIndex, $codePoint, $i, $buffer, $digit, var$11, var$12, $b, $count, $pos, $j, var$17, var$18;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    var$3 = $ranges.data;
    var$4 = $rt_createByteArray(16384).data;
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    a: {
        b: {
            while (true) {
                $buffer = $encoded.$characters.data;
                $digit = $rt_compare($i, $buffer.length);
                if ($digit >= 0) {
                    var$11 = $ranges.constructor;
                    if (var$11 === null)
                        $encoded = null;
                    else {
                        $encoded = var$11.classObject;
                        if ($encoded === null) {
                            $encoded = new jl_Class;
                            $encoded.$platformClass = var$11;
                            var$12 = $encoded;
                            var$11.classObject = var$12;
                        }
                    }
                    $encoded = jl_Class_getComponentType($encoded);
                    if ($encoded === null) {
                        $encoded = new jl_NullPointerException;
                        $encoded.$suppressionEnabled = 1;
                        $encoded.$writableStackTrace = 1;
                        $rt_throw($encoded);
                    }
                    if ($encoded === $rt_cls($rt_voidcls())) {
                        $encoded = new jl_IllegalArgumentException;
                        $encoded.$suppressionEnabled = 1;
                        $encoded.$writableStackTrace = 1;
                        $rt_throw($encoded);
                    }
                    if ($rangeIndex < 0) {
                        $encoded = new jl_NegativeArraySizeException;
                        $encoded.$suppressionEnabled = 1;
                        $encoded.$writableStackTrace = 1;
                        $rt_throw($encoded);
                    }
                    var$12 = jlr_Array_newInstanceImpl($encoded.$platformClass, $rangeIndex);
                    $index = var$3.length;
                    if ($rangeIndex < $index)
                        $index = $rangeIndex;
                    $rangeIndex = 0;
                    while ($rangeIndex < $index) {
                        var$12.data[$rangeIndex] = var$3[$rangeIndex];
                        $rangeIndex = $rangeIndex + 1 | 0;
                    }
                    return var$12;
                }
                if ($i < 0)
                    break;
                if ($digit >= 0)
                    break;
                $b = otciu_UnicodeHelper_decodeByte($buffer[$i]);
                if ($b == 64) {
                    $i = $i + 1 | 0;
                    if ($i < 0)
                        break b;
                    $buffer = $encoded.$characters.data;
                    if ($i >= $buffer.length)
                        break b;
                    $b = otciu_UnicodeHelper_decodeByte($buffer[$i]);
                    $count = 0;
                    $pos = 1;
                    $j = 0;
                    while ($j < 3) {
                        $i = $i + 1 | 0;
                        if ($i < 0)
                            break a;
                        $buffer = $encoded.$characters.data;
                        if ($i >= $buffer.length)
                            break a;
                        $count = $count | $rt_imul($pos, otciu_UnicodeHelper_decodeByte($buffer[$i]));
                        $pos = $pos * 64 | 0;
                        $j = $j + 1 | 0;
                    }
                } else if ($b < 32)
                    $count = 1;
                else {
                    $b = ($b - 32 | 0) << 24 >> 24;
                    $i = $i + 1 | 0;
                    $count = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
                }
                if (!$b && $count >= 128) {
                    if ($index > 0) {
                        $digit = $rangeIndex + 1 | 0;
                        var$11 = new otciu_UnicodeHelper$Range;
                        $pos = $codePoint + $index | 0;
                        $buffer = $rt_createByteArray($index);
                        $j = var$4.length;
                        if ($index < $j)
                            $j = $index;
                        var$17 = $buffer.data;
                        var$18 = 0;
                        while (var$18 < $j) {
                            var$17[var$18] = var$4[var$18];
                            var$18 = var$18 + 1 | 0;
                        }
                        var$11.$start = $codePoint;
                        var$11.$end = $pos;
                        var$11.$data = $buffer;
                        var$3[$rangeIndex] = var$11;
                        $rangeIndex = $digit;
                    }
                    $codePoint = $codePoint + ($index + $count | 0) | 0;
                    $index = 0;
                } else {
                    $digit = $index + $count | 0;
                    $pos = var$4.length;
                    if ($digit < $pos)
                        $j = $rangeIndex;
                    else {
                        $j = $rangeIndex + 1 | 0;
                        var$11 = new otciu_UnicodeHelper$Range;
                        var$18 = $codePoint + $index | 0;
                        $buffer = $rt_createByteArray($index);
                        if ($index < $pos)
                            $pos = $index;
                        var$17 = $buffer.data;
                        $index = 0;
                        while ($index < $pos) {
                            var$17[$index] = var$4[$index];
                            $index = $index + 1 | 0;
                        }
                        var$11.$start = $codePoint;
                        var$11.$end = var$18;
                        var$11.$data = $buffer;
                        var$3[$rangeIndex] = var$11;
                        $codePoint = $codePoint + $digit | 0;
                        $index = 0;
                    }
                    while (true) {
                        $rangeIndex = $count + (-1) | 0;
                        if ($count <= 0)
                            break;
                        $digit = $index + 1 | 0;
                        var$4[$index] = $b;
                        $index = $digit;
                        $count = $rangeIndex;
                    }
                    $rangeIndex = $j;
                }
                $i = $i + 1 | 0;
            }
            $encoded = new jl_StringIndexOutOfBoundsException;
            $encoded.$suppressionEnabled = 1;
            $encoded.$writableStackTrace = 1;
            $rt_throw($encoded);
        }
        $encoded = new jl_StringIndexOutOfBoundsException;
        $encoded.$suppressionEnabled = 1;
        $encoded.$writableStackTrace = 1;
        $rt_throw($encoded);
    }
    $encoded = new jl_StringIndexOutOfBoundsException;
    $encoded.$suppressionEnabled = 1;
    $encoded.$writableStackTrace = 1;
    $rt_throw($encoded);
}
function otciu_UnicodeHelper$Range() {
    var a = this; jl_Object.call(a);
    a.$start = 0;
    a.$end = 0;
    a.$data = null;
}
function otci_CharFlow() {
    var a = this; jl_Object.call(a);
    a.$characters0 = null;
    a.$pointer = 0;
}
var otci_Base46 = $rt_classWithoutFields();
function otci_Base46_decodeUnsigned($seq) {
    var $number, $pos, var$4, $hasMore, $digit;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters0.data;
        $hasMore = $seq.$pointer;
        $seq.$pointer = $hasMore + 1 | 0;
        $digit = var$4[$hasMore];
        $digit = $digit < 34 ? $digit - 32 | 0 : $digit >= 92 ? ($digit - 32 | 0) - 2 | 0 : ($digit - 32 | 0) - 1 | 0;
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
}
function jur_AbstractCharClass$1() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$0 = null;
}
function jur_AbstractCharClass$1_contains($this, $ch) {
    var $index, var$3, var$4, var$5;
    $index = $ch - 55296 | 0;
    if ($index >= 0 && $index < 2048) {
        $ch = $this.$altSurrogates;
        var$3 = $this.$val$lHS;
        var$4 = $index / 32 | 0;
        var$5 = var$3.$data0.data;
        $ch = $ch ^ (var$4 < var$5.length && var$5[var$4] & 1 << ($index % 32 | 0) ? 1 : 0);
    } else
        $ch = 0;
    return $ch;
}
function jur_AbstractCharClass$2() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$00 = null;
}
function jur_AbstractCharClass$2_contains($this, $ch) {
    var $index, var$3, var$4, $containslHS, var$6;
    $index = $ch - 55296 | 0;
    if ($index >= 0 && $index < 2048) {
        var$3 = $this.$altSurrogates;
        var$4 = $this.$val$lHS0;
        $containslHS = $index / 32 | 0;
        var$6 = var$4.$data0.data;
        $containslHS = var$3 ^ ($containslHS < var$6.length && var$6[$containslHS] & 1 << ($index % 32 | 0) ? 1 : 0);
    } else
        $containslHS = 0;
    return $this.$val$thisClass.$contains($ch) && !$containslHS ? 1 : 0;
}
function jur_CharClass$18() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$018 = null;
}
function jur_CharClass$18_contains($this, $ch) {
    var var$2, var$3, var$4, var$5;
    var$2 = $this.$alt0;
    var$3 = $this.$val$bs;
    var$4 = $ch / 32 | 0;
    var$5 = var$3.$data0.data;
    return var$2 ^ (var$4 < var$5.length && var$5[var$4] & 1 << ($ch % 32 | 0) ? 1 : 0);
}
function jur_CharClass$18_toString($this) {
    var $temp, $i, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    $temp = new jl_StringBuilder;
    $temp.$buffer = $rt_createCharArray(16);
    $i = ju_BitSet_nextSetBit($this.$val$bs, 0);
    while ($i >= 0) {
        if ($i < 65536) {
            var$3 = $rt_createCharArray(1);
            var$3.data[0] = $i & 65535;
        } else
            var$3 = $rt_createCharArrayFromData([(55296 | ($i - 65536 | 0) >> 10 & 1023) & 65535, (56320 | $i & 1023) & 65535]);
        var$4 = var$3.data;
        var$5 = 0;
        var$6 = var$4.length;
        var$7 = $temp.$length;
        jl_AbstractStringBuilder_insertSpace($temp, var$7, var$7 + var$6 | 0);
        var$6 = var$6 + var$5 | 0;
        while (var$5 < var$6) {
            var$3 = $temp.$buffer.data;
            var$8 = var$7 + 1 | 0;
            var$9 = var$5 + 1 | 0;
            var$3[var$7] = var$4[var$5];
            var$7 = var$8;
            var$5 = var$9;
        }
        var$6 = $temp.$length;
        jl_AbstractStringBuilder_insertSpace($temp, var$6, var$6 + 1 | 0);
        $temp.$buffer.data[var$6] = 124;
        $i = ju_BitSet_nextSetBit($this.$val$bs, $i + 1 | 0);
    }
    var$7 = $temp.$length;
    if (var$7 > 0)
        jl_AbstractStringBuilder_deleteCharAt($temp, var$7 - 1 | 0);
    var$10 = new jl_String;
    var$3 = $temp.$buffer;
    var$7 = $temp.$length;
    var$4 = $rt_createCharArray(var$7);
    var$11 = var$4.data;
    var$10.$characters = var$4;
    var$9 = 0;
    while (var$9 < var$7) {
        var$11[var$9] = var$3.data[var$9 + 0 | 0];
        var$9 = var$9 + 1 | 0;
    }
    return var$10;
}
function jur_CharClass$1() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$cc1 = null;
    a.$this$03 = null;
}
function jur_CharClass$1_contains($this, $ch) {
    return $this.$val$cc1.$contains($ch);
}
function jur_CharClass$3() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt1 = 0;
    a.$val$cc2 = null;
    a.$this$04 = null;
}
function jur_CharClass$3_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$curAlt1;
    var$3 = $this.$this$04;
    var$4 = var$3.$bits;
    var$5 = $ch / 32 | 0;
    var$6 = var$4.$data0.data;
    var$5 = var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0;
    return !(var$2 ^ var$5) && !(var$2 ^ var$3.$inverted ^ $this.$val$cc2.$contains($ch)) ? 0 : 1;
}
function jur_CharClass$2() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt2 = 0;
    a.$val$cc3 = null;
    a.$this$05 = null;
}
function jur_CharClass$2_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$curAlt2;
    var$3 = $this.$this$05;
    var$4 = var$3.$bits;
    var$5 = $ch / 32 | 0;
    var$6 = var$4.$data0.data;
    var$5 = var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0;
    return !(var$2 ^ var$5) && !(var$2 ^ var$3.$inverted ^ $this.$val$cc3.$contains($ch)) ? 1 : 0;
}
function jur_CharClass$5() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$nb = null;
    a.$val$cc = null;
    a.$this$01 = null;
}
function jur_CharClass$5_contains($this, $ch) {
    return $this.$val$curAlt ^ (!$this.$val$nb.$contains($ch) && !$this.$val$cc.$contains($ch) ? 0 : 1);
}
function jur_CharClass$4() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$nb0 = null;
    a.$val$cc0 = null;
    a.$this$02 = null;
}
function jur_CharClass$4_contains($this, $ch) {
    return $this.$val$curAlt0 ^ (!$this.$val$nb0.$contains($ch) && !$this.$val$cc0.$contains($ch) ? 0 : 1) ? 0 : 1;
}
function jur_CharClass$7() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$this$08 = null;
}
function jur_CharClass$7_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz1;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        $ch = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    return $ch;
}
function jur_CharClass$6() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$this$09 = null;
}
function jur_CharClass$6_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz2;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        $ch = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    return $ch ? 0 : 1;
}
function jur_CharClass$9() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz3 = null;
    a.$val$curAlt5 = 0;
    a.$this$010 = null;
}
function jur_CharClass$9_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz3;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        var$4 = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        var$4 = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    a: {
        if (!var$4) {
            var$4 = $this.$val$curAlt5;
            var$2 = $this.$this$010.$bits;
            var$5 = $ch / 32 | 0;
            var$6 = var$2.$data0.data;
            if (!(var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0))) {
                $ch = 0;
                break a;
            }
        }
        $ch = 1;
    }
    return $ch;
}
function jur_CharClass$8() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$val$curAlt6 = 0;
    a.$this$011 = null;
}
function jur_CharClass$8_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz4;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        var$4 = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        var$4 = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    a: {
        if (!var$4) {
            var$4 = $this.$val$curAlt6;
            var$2 = $this.$this$011.$bits;
            var$5 = $ch / 32 | 0;
            var$6 = var$2.$data0.data;
            if (!(var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0))) {
                $ch = 1;
                break a;
            }
        }
        $ch = 0;
    }
    return $ch;
}
function jur_CharClass$11() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb1 = null;
    a.$val$clazz = null;
    a.$this$06 = null;
}
function jur_CharClass$11_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    a: {
        if (!($this.$val$curAlt3 ^ $this.$val$nb1.$contains($ch))) {
            var$2 = $this.$val$clazz;
            var$3 = var$2.$nonBitSet;
            if (var$3 !== null)
                $ch = var$2.$alt0 ^ var$3.$contains($ch);
            else {
                var$4 = var$2.$alt0;
                var$2 = var$2.$bits;
                var$5 = $ch / 32 | 0;
                var$6 = var$2.$data0.data;
                $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
            }
            if (!$ch) {
                $ch = 0;
                break a;
            }
        }
        $ch = 1;
    }
    return $ch;
}
function jur_CharClass$10() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz0 = null;
    a.$this$07 = null;
}
function jur_CharClass$10_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    a: {
        if (!($this.$val$curAlt4 ^ $this.$val$nb2.$contains($ch))) {
            var$2 = $this.$val$clazz0;
            var$3 = var$2.$nonBitSet;
            if (var$3 !== null)
                $ch = var$2.$alt0 ^ var$3.$contains($ch);
            else {
                var$4 = var$2.$alt0;
                var$2 = var$2.$bits;
                var$5 = $ch / 32 | 0;
                var$6 = var$2.$data0.data;
                $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
            }
            if (!$ch) {
                $ch = 1;
                break a;
            }
        }
        $ch = 0;
    }
    return $ch;
}
function jur_CharClass$13() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$014 = null;
}
function jur_CharClass$13_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz7;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        $ch = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    return $ch;
}
function jur_CharClass$12() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz8 = null;
    a.$this$015 = null;
}
function jur_CharClass$12_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz8;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        $ch = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    return $ch ? 0 : 1;
}
function jur_CharClass$15() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt9 = 0;
    a.$this$016 = null;
}
function jur_CharClass$15_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz9;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        var$4 = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        var$4 = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    a: {
        if (var$4) {
            var$4 = $this.$val$curAlt9;
            var$2 = $this.$this$016.$bits;
            var$5 = $ch / 32 | 0;
            var$6 = var$2.$data0.data;
            if (var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0)) {
                $ch = 1;
                break a;
            }
        }
        $ch = 0;
    }
    return $ch;
}
function jur_CharClass$14() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz10 = null;
    a.$val$curAlt10 = 0;
    a.$this$017 = null;
}
function jur_CharClass$14_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = $this.$val$clazz10;
    var$3 = var$2.$nonBitSet;
    if (var$3 !== null)
        var$4 = var$2.$alt0 ^ var$3.$contains($ch);
    else {
        var$4 = var$2.$alt0;
        var$2 = var$2.$bits;
        var$5 = $ch / 32 | 0;
        var$6 = var$2.$data0.data;
        var$4 = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
    }
    a: {
        if (var$4) {
            var$4 = $this.$val$curAlt10;
            var$2 = $this.$this$017.$bits;
            var$5 = $ch / 32 | 0;
            var$6 = var$2.$data0.data;
            if (var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0)) {
                $ch = 0;
                break a;
            }
        }
        $ch = 1;
    }
    return $ch;
}
function jur_CharClass$17() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$clazz5 = null;
    a.$this$012 = null;
}
function jur_CharClass$17_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    a: {
        if ($this.$val$curAlt7 ^ $this.$val$nb3.$contains($ch)) {
            var$2 = $this.$val$clazz5;
            var$3 = var$2.$nonBitSet;
            if (var$3 !== null)
                $ch = var$2.$alt0 ^ var$3.$contains($ch);
            else {
                var$4 = var$2.$alt0;
                var$2 = var$2.$bits;
                var$5 = $ch / 32 | 0;
                var$6 = var$2.$data0.data;
                $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
            }
            if ($ch) {
                $ch = 1;
                break a;
            }
        }
        $ch = 0;
    }
    return $ch;
}
function jur_CharClass$16() {
    var a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt8 = 0;
    a.$val$nb4 = null;
    a.$val$clazz6 = null;
    a.$this$013 = null;
}
function jur_CharClass$16_contains($this, $ch) {
    var var$2, var$3, var$4, var$5, var$6;
    a: {
        if ($this.$val$curAlt8 ^ $this.$val$nb4.$contains($ch)) {
            var$2 = $this.$val$clazz6;
            var$3 = var$2.$nonBitSet;
            if (var$3 !== null)
                $ch = var$2.$alt0 ^ var$3.$contains($ch);
            else {
                var$4 = var$2.$alt0;
                var$2 = var$2.$bits;
                var$5 = $ch / 32 | 0;
                var$6 = var$2.$data0.data;
                $ch = var$4 ^ (var$5 < var$6.length && var$6[var$5] & 1 << ($ch % 32 | 0) ? 1 : 0);
            }
            if ($ch) {
                $ch = 0;
                break a;
            }
        }
        $ch = 1;
    }
    return $ch;
}
var jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet);
function jur_BackReferencedSingleSet_find($this, $startSearch, $testString, $matchResult) {
    var $res, $lastIndex, var$6, var$7, var$8, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$rightBound;
    a: {
        while (true) {
            if ($startSearch > $lastIndex) {
                $startSearch = $res;
                break a;
            }
            var$6 = $this.$groupIndex0;
            var$7 = $matchResult.$groupBounds.data;
            var$8 = var$6 * 2 | 0;
            $saveStart = var$7[var$8];
            var$7[var$8] = $startSearch;
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            var$8 = $this.$groupIndex0;
            $matchResult.$groupBounds.data[var$8 * 2 | 0] = $saveStart;
            $startSearch = $startSearch + 1 | 0;
        }
    }
    return $startSearch;
}
function jur_BackReferencedSingleSet_findBack($this, $stringIndex, $startSearch, $testString, $matchResult) {
    var $res, var$6, var$7, var$8, $saveStart;
    $res = 0;
    a: {
        while (true) {
            if ($startSearch < $stringIndex) {
                $startSearch = $res;
                break a;
            }
            var$6 = $this.$groupIndex0;
            var$7 = $matchResult.$groupBounds.data;
            var$8 = var$6 * 2 | 0;
            $saveStart = var$7[var$8];
            var$7[var$8] = $startSearch;
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            var$8 = $this.$groupIndex0;
            $matchResult.$groupBounds.data[var$8 * 2 | 0] = $saveStart;
            $startSearch = $startSearch + (-1) | 0;
        }
    }
    return $startSearch;
}
function jur_BackReferencedSingleSet_processBackRefReplacement($this) {
    return null;
}
var ju_Iterator = $rt_classWithoutFields(0);
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index3 = 0;
    a.$modCount0 = 0;
    a.$size2 = 0;
    a.$removeIndex = 0;
    a.$this$035 = null;
}
var otcic_Console = $rt_classWithoutFields();
var jur_MatchResult = $rt_classWithoutFields(0);
function jur_Matcher() {
    var a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start4 = null;
    a.$string3 = null;
    a.$matchResult = null;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
}
function jur_Matcher__init_(var_0, var_1) {
    var var_2 = new jur_Matcher();
    jur_Matcher__init_0(var_2, var_0, var_1);
    return var_2;
}
function jur_Matcher_find0($this, $start) {
    var var$2, $stringLength, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$2 = $this.$string3;
    $stringLength = var$2.$characters.data.length;
    if ($start >= 0 && $start <= $stringLength) {
        var$4 = $this.$matchResult;
        var$4.$valid = 0;
        var$4.$mode0 = 2;
        var$5 = var$4.$groupBounds.data;
        var$6 = 0;
        var$7 = var$5.length;
        if (var$6 > var$7) {
            var$2 = new jl_IllegalArgumentException;
            jl_Throwable__init_0(var$2);
            $rt_throw(var$2);
        }
        while (var$6 < var$7) {
            var$8 = var$6 + 1 | 0;
            var$5[var$6] = (-1);
            var$6 = var$8;
        }
        var$5 = var$4.$consumers.data;
        var$6 = 0;
        var$7 = var$5.length;
        if (var$6 > var$7) {
            var$2 = new jl_IllegalArgumentException;
            jl_Throwable__init_0(var$2);
            $rt_throw(var$2);
        }
        while (var$6 < var$7) {
            var$8 = var$6 + 1 | 0;
            var$5[var$6] = (-1);
            var$6 = var$8;
        }
        var$4.$startIndex = var$4.$leftBound;
        var$4.$mode0 = 1;
        var$4.$startIndex = $start;
        $stringLength = var$4.$previousMatch;
        if ($stringLength < 0)
            $stringLength = $start;
        var$4.$previousMatch = $stringLength;
        $start = $this.$start4.$find0($start, var$2, var$4);
        if ($start == (-1))
            $this.$matchResult.$hitEnd = 1;
        if ($start >= 0) {
            var$2 = $this.$matchResult;
            $start = var$2.$valid;
            if ($start) {
                var$5 = var$2.$groupBounds.data;
                if (var$5[0] == (-1)) {
                    var$6 = var$2.$startIndex;
                    var$5[0] = var$6;
                    var$5[1] = var$6;
                }
                if (!$start) {
                    var$2 = new jl_IllegalStateException;
                    var$2.$suppressionEnabled = 1;
                    var$2.$writableStackTrace = 1;
                    $rt_throw(var$2);
                }
                if (0 < var$2.$groupCount) {
                    var$2.$previousMatch = var$5[1];
                    return 1;
                }
                var$2 = new jl_IndexOutOfBoundsException;
                var$4 = new jl_StringBuilder;
                jl_Object__init_0(var$4);
                var$4.$buffer = $rt_createCharArray(16);
                jl_AbstractStringBuilder_insert0(var$4, var$4.$length, 0, 10);
                var$9 = new jl_String;
                var$5 = var$4.$buffer;
                $stringLength = var$4.$length;
                var$10 = $rt_createCharArray($stringLength);
                var$11 = var$10.data;
                var$9.$characters = var$10;
                var$6 = 0;
                while (var$6 < $stringLength) {
                    var$11[var$6] = var$5.data[var$6 + 0 | 0];
                    var$6 = var$6 + 1 | 0;
                }
                var$2.$suppressionEnabled = 1;
                var$2.$writableStackTrace = 1;
                var$2.$message = var$9;
                $rt_throw(var$2);
            }
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    var$2 = new jl_IndexOutOfBoundsException;
    var$4 = new jl_StringBuilder;
    var$4.$buffer = $rt_createCharArray(16);
    jl_AbstractStringBuilder_insert0(var$4, var$4.$length, $start, 10);
    var$9 = new jl_String;
    var$5 = var$4.$buffer;
    $stringLength = var$4.$length;
    var$10 = $rt_createCharArray($stringLength);
    var$11 = var$10.data;
    var$9.$characters = var$10;
    var$6 = 0;
    while (var$6 < $stringLength) {
        var$11[var$6] = var$5.data[var$6 + 0 | 0];
        var$6 = var$6 + 1 | 0;
    }
    var$2.$suppressionEnabled = 1;
    var$2.$writableStackTrace = 1;
    var$2.$message = var$9;
    $rt_throw(var$2);
}
function jur_Matcher_find($this) {
    var $length, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    $length = $this.$string3.$characters.data.length;
    var$2 = $this.$matchResult;
    if (!var$2.$transparentBounds)
        $length = $this.$rightBound0;
    if (var$2.$startIndex >= 0 && var$2.$mode0 == 1) {
        var$3 = var$2.$valid;
        if (!var$3) {
            var$2 = new jl_IllegalStateException;
            var$2.$suppressionEnabled = 1;
            var$2.$writableStackTrace = 1;
            $rt_throw(var$2);
        }
        var$4 = $rt_compare(0, var$2.$groupCount);
        if (var$4 >= 0) {
            var$2 = new jl_IndexOutOfBoundsException;
            var$5 = new jl_StringBuilder;
            var$5.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert0(var$5, var$5.$length, 0, 10);
            var$6 = new jl_String;
            var$7 = var$5.$buffer;
            $length = var$5.$length;
            var$8 = $rt_createCharArray($length);
            var$9 = var$8.data;
            var$6.$characters = var$8;
            var$10 = 0;
            while (var$10 < $length) {
                var$9[var$10] = var$7.data[var$10 + 0 | 0];
                var$10 = var$10 + 1 | 0;
            }
            var$2.$suppressionEnabled = 1;
            var$2.$writableStackTrace = 1;
            var$2.$message = var$6;
            $rt_throw(var$2);
        }
        var$7 = var$2.$groupBounds.data;
        var$11 = var$7[1];
        var$2.$startIndex = var$11;
        if (!var$3) {
            var$2 = new jl_IllegalStateException;
            var$2.$suppressionEnabled = 1;
            var$2.$writableStackTrace = 1;
            $rt_throw(var$2);
        }
        if (var$4 >= 0) {
            var$2 = new jl_IndexOutOfBoundsException;
            var$5 = new jl_StringBuilder;
            var$5.$buffer = $rt_createCharArray(16);
            jl_AbstractStringBuilder_insert0(var$5, var$5.$length, 0, 10);
            var$6 = new jl_String;
            var$7 = var$5.$buffer;
            $length = var$5.$length;
            var$8 = $rt_createCharArray($length);
            var$9 = var$8.data;
            var$6.$characters = var$8;
            var$10 = 0;
            while (var$10 < $length) {
                var$9[var$10] = var$7.data[var$10 + 0 | 0];
                var$10 = var$10 + 1 | 0;
            }
            var$2.$suppressionEnabled = 1;
            var$2.$writableStackTrace = 1;
            var$2.$message = var$6;
            $rt_throw(var$2);
        }
        var$10 = var$7[1];
        if (!var$3) {
            var$2 = new jl_IllegalStateException;
            var$2.$suppressionEnabled = 1;
            var$2.$writableStackTrace = 1;
            $rt_throw(var$2);
        }
        if (var$4 < 0) {
            if (var$10 == var$7[0])
                var$2.$startIndex = var$11 + 1 | 0;
            var$12 = var$2.$startIndex;
            return var$12 <= $length && jur_Matcher_find0($this, var$12) ? 1 : 0;
        }
        var$2 = new jl_IndexOutOfBoundsException;
        var$5 = new jl_StringBuilder;
        var$5.$buffer = $rt_createCharArray(16);
        jl_AbstractStringBuilder_insert0(var$5, var$5.$length, 0, 10);
        var$6 = new jl_String;
        var$7 = var$5.$buffer;
        $length = var$5.$length;
        var$8 = $rt_createCharArray($length);
        var$9 = var$8.data;
        var$6.$characters = var$8;
        var$10 = 0;
        while (var$10 < $length) {
            var$9[var$10] = var$7.data[var$10 + 0 | 0];
            var$10 = var$10 + 1 | 0;
        }
        var$2.$suppressionEnabled = 1;
        var$2.$writableStackTrace = 1;
        var$2.$message = var$6;
        $rt_throw(var$2);
    }
    return jur_Matcher_find0($this, $this.$leftBound0);
}
function jur_Matcher__init_0($this, $pat, $cs) {
    var var$3;
    $this.$leftBound0 = (-1);
    $this.$rightBound0 = (-1);
    $this.$pat = $pat;
    $this.$start4 = $pat.$start2;
    $this.$string3 = $cs;
    $this.$leftBound0 = 0;
    var$3 = $cs.$characters.data.length;
    $this.$rightBound0 = var$3;
    $this.$matchResult = jur_MatchResultImpl__init_($cs, 0, var$3, $pat.$globalGroupIndex, $pat.$compCount + 1 | 0, $pat.$consCount + 1 | 0);
}
var jnc_CoderMalfunctionError = $rt_classWithoutFields(jl_Error);
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$019 = null;
}
function jur_AbstractCharClass$LazyJavaLowerCase$1_contains($this, $ch) {
    return jl_Character_getType($ch) != 2 ? 0 : 1;
}
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$020 = null;
}
function jur_AbstractCharClass$LazyJavaUpperCase$1_contains($this, $ch) {
    return jl_Character_getType($ch) != 1 ? 0 : 1;
}
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$021 = null;
}
function jur_AbstractCharClass$LazyJavaWhitespace$1_contains($this, $ch) {
    a: {
        switch ($ch) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 28:
            case 29:
            case 30:
            case 31:
                break;
            case 160:
            case 8199:
            case 8239:
                $ch = 0;
                break a;
            default:
                b: {
                    switch (jl_Character_getType($ch)) {
                        case 12:
                        case 13:
                        case 14:
                            break;
                        default:
                            $ch = 0;
                            break b;
                    }
                    $ch = 1;
                }
                break a;
        }
        $ch = 1;
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$022 = null;
}
function jur_AbstractCharClass$LazyJavaMirrored$1_contains($this, $ch) {
    return 0;
}
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$023 = null;
}
function jur_AbstractCharClass$LazyJavaDefined$1_contains($this, $ch) {
    return !jl_Character_getType($ch) ? 0 : 1;
}
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$024 = null;
}
function jur_AbstractCharClass$LazyJavaDigit$1_contains($this, $ch) {
    return jl_Character_getType($ch) != 9 ? 0 : 1;
}
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$025 = null;
}
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains($this, $ch) {
    return jl_Character_isIdentifierIgnorable($ch);
}
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$026 = null;
}
function jur_AbstractCharClass$LazyJavaISOControl$1_contains($this, $ch) {
    a: {
        b: {
            if (!($ch >= 0 && $ch <= 31)) {
                if ($ch < 127)
                    break b;
                if ($ch > 159)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$027 = null;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains($this, $ch) {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                case 26:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$028 = null;
}
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains($this, $ch) {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                case 23:
                case 26:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$029 = null;
}
function jur_AbstractCharClass$LazyJavaLetter$1_contains($this, $ch) {
    a: {
        switch (jl_Character_getType($ch)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                $ch = 0;
                break a;
        }
        $ch = 1;
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$030 = null;
}
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains($this, $ch) {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 9:
                    break;
                case 6:
                case 7:
                case 8:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$031 = null;
}
function jur_AbstractCharClass$LazyJavaSpaceChar$1_contains($this, $ch) {
    a: {
        switch (jl_Character_getType($ch)) {
            case 12:
            case 13:
            case 14:
                break;
            default:
                $ch = 0;
                break a;
        }
        $ch = 1;
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$032 = null;
}
function jur_AbstractCharClass$LazyJavaTitleCase$1_contains($this, $ch) {
    return jl_Character_getType($ch) != 3 ? 0 : 1;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$033 = null;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains($this, $ch) {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$034 = null;
}
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains($this, $ch) {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
}
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category0 = 0;
}
function jur_UnicodeCategory_contains($this, $ch) {
    return $this.$alt0 ^ ($this.$category0 != jl_Character_getType($ch & 65535) ? 0 : 1);
}
var jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory);
function jur_UnicodeCategoryScope_contains($this, $ch) {
    return $this.$alt0 ^ (!($this.$category0 >> jl_Character_getType($ch & 65535) & 1) ? 0 : 1);
}
var ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
function jur_MatchResultImpl() {
    var a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string0 = null;
    a.$groupCount = 0;
    a.$valid = 0;
    a.$leftBound = 0;
    a.$rightBound = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode0 = 0;
}
function jur_MatchResultImpl__init_(var_0, var_1, var_2, var_3, var_4, var_5) {
    var var_6 = new jur_MatchResultImpl();
    jur_MatchResultImpl__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
}
function jur_MatchResultImpl__init_0($this, $string, $leftBound, $rightBound, $groupCount, $compQuantCount, $consumersCount) {
    var var$7, var$8, var$9, var$10, var$11, var$12;
    $this.$previousMatch = (-1);
    var$7 = $groupCount + 1 | 0;
    $this.$groupCount = var$7;
    var$8 = $rt_createIntArray(var$7 * 2 | 0);
    $this.$groupBounds = var$8;
    var$9 = $rt_createIntArray($consumersCount);
    var$10 = var$9.data;
    $this.$consumers = var$9;
    $groupCount = 0;
    $consumersCount = var$10.length;
    var$11 = $rt_compare($groupCount, $consumersCount);
    if (var$11 > 0) {
        $string = new jl_IllegalArgumentException;
        $string.$suppressionEnabled = 1;
        $string.$writableStackTrace = 1;
        $rt_throw($string);
    }
    while ($groupCount < $consumersCount) {
        var$7 = $groupCount + 1 | 0;
        var$10[$groupCount] = (-1);
        $groupCount = var$7;
    }
    if ($compQuantCount > 0)
        $this.$compQuantCounters = $rt_createIntArray($compQuantCount);
    var$8 = var$8.data;
    var$7 = 0;
    var$12 = var$8.length;
    $groupCount = $rt_compare(var$7, var$12);
    if ($groupCount > 0) {
        $string = new jl_IllegalArgumentException;
        $string.$suppressionEnabled = 1;
        $string.$writableStackTrace = 1;
        $rt_throw($string);
    }
    while (var$7 < var$12) {
        $compQuantCount = var$7 + 1 | 0;
        var$8[var$7] = (-1);
        var$7 = $compQuantCount;
    }
    $this.$valid = 0;
    $this.$mode0 = 2;
    $compQuantCount = 0;
    if ($groupCount > 0) {
        $string = new jl_IllegalArgumentException;
        $string.$suppressionEnabled = 1;
        $string.$writableStackTrace = 1;
        $rt_throw($string);
    }
    while ($compQuantCount < var$12) {
        $groupCount = $compQuantCount + 1 | 0;
        var$8[$compQuantCount] = (-1);
        $compQuantCount = $groupCount;
    }
    $groupCount = 0;
    if (var$11 > 0) {
        $string = new jl_IllegalArgumentException;
        $string.$suppressionEnabled = 1;
        $string.$writableStackTrace = 1;
        $rt_throw($string);
    }
    while ($groupCount < $consumersCount) {
        var$7 = $groupCount + 1 | 0;
        var$10[$groupCount] = (-1);
        $groupCount = var$7;
    }
    if ($string !== null)
        $this.$string0 = $string;
    if ($leftBound >= 0) {
        $this.$leftBound = $leftBound;
        $this.$rightBound = $rightBound;
    }
    $this.$startIndex = $this.$leftBound;
}
var jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException);
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in = null;
    a.$out1 = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
var jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException);
var jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException);
var jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException);
var jur_IntArrHash = $rt_classWithoutFields();
$rt_packages([-1, "java", 0, "util", 1, "regex", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_Object_toString)],
nles_IntegratedServer, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_String_toString)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuilder_insert), "$append2", $rt_wrapFunction3(jl_StringBuilder_append0), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert0)],
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
nles_SYS, 0, jl_Object, [], 0, 3, 0, nles_SYS_$callClinit, 0,
nles_VFSTestClass, 0, jl_Object, [], 0, 3, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
nles_VFile, 0, jl_Object, [], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(nles_VFile_toString)],
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_84_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0, 0,
nles_BooleanResult, 0, jl_Object, [], 0, 3, 0, 0, 0,
nles_VirtualFilesystem, 0, jl_Object, [], 0, 3, 0, 0, 0,
nles_VirtualFilesystem$VFSHandle, 0, jl_Object, [], 0, 3, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_GamepadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget, otjde_GamepadEventTarget], 3, 3, 0, 0, 0,
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, 0, ["$addEventListener$exported$0", $rt_wrapFunction2(otjb_Window_addEventListener$exported$0), "$removeEventListener$exported$1", $rt_wrapFunction2(otjb_Window_removeEventListener$exported$1), "$get$exported$2", $rt_wrapFunction1(otjb_Window_get$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(otjb_Window_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(otjb_Window_dispatchEvent$exported$4),
"$getLength$exported$5", $rt_wrapFunction0(otjb_Window_getLength$exported$5), "$addEventListener$exported$6", $rt_wrapFunction3(otjb_Window_addEventListener$exported$6)],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0]);
$rt_metadata([ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0, 0,
otcic_StdoutOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, 0,
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, 0, ["$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
nles_SYS$PromiseHandler, 0, jl_Object, [otj_JSObject], 3, 0, 0, 0, 0,
nles_SYS$requestPersist$lambda$_2_0, 0, jl_Object, [nles_SYS$PromiseHandler], 0, 3, 0, 0, ["$complete$exported$0", $rt_wrapFunction1(nles_SYS$requestPersist$lambda$_2_0_complete$exported$0)],
nles_VirtualFilesystem$AsyncHandlers, 0, jl_Object, [], 0, 3, 0, 0, 0,
nles_VirtualFilesystem$DatabaseOpen, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, 0,
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, 0,
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, 0, 0,
otji_EventHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
nles_VirtualFilesystem$AsyncHandlers$1, 0, jl_Object, [otji_EventHandler], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction0(nles_VirtualFilesystem$AsyncHandlers$1_handleEvent$exported$0)],
nles_VirtualFilesystem$AsyncHandlers$2, 0, jl_Object, [otji_EventHandler], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction0(nles_VirtualFilesystem$AsyncHandlers$2_handleEvent$exported$0)],
nles_VirtualFilesystem$AsyncHandlers$3, 0, jl_Object, [otji_EventHandler], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction0(nles_VirtualFilesystem$AsyncHandlers$3_handleEvent$exported$0)],
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
nles_VirtualFilesystem$AsyncHandlers$4, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$00", $rt_wrapFunction1(nles_VirtualFilesystem$AsyncHandlers$4_handleEvent$exported$0)],
otji_IDBFactory, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, 0,
jl_IllegalStateException, "IllegalStateException", 3, jl_Exception, [], 0, 3, 0, 0, 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jnc_IllegalCharsetNameException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, 0,
jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, 0, 0,
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0, 0,
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0, 0,
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0, 0,
jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, 0, 0,
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0, 0]);
$rt_metadata([jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, 0, 0,
jur_Pattern, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
otji_IDBObjectStoreParameters, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0, 0,
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, 0,
ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_AbstractSet, 0, jl_Object, [], 1, 0, 0, 0, ["$find0", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$getType0", $rt_wrapFunction0(jur_AbstractSet_getType), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext), "$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
otjc_JSArray, 0, jl_Object, [otjc_JSArrayReader], 1, 3, 0, 0, ["$get$exported$0", $rt_wrapFunction1(otjc_JSArray_get$exported$0), "$getLength$exported$1", $rt_wrapFunction0(otjc_JSArray_getLength$exported$1)],
otjc_JSString, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
jur_FSet, 0, jur_AbstractSet, [], 0, 0, 0, jur_FSet_$callClinit, ["$matches", $rt_wrapFunction3(jur_FSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_Lexer, 0, jl_Object, [], 0, 0, 0, 0, 0,
jur_PatternSyntaxException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
jur_NonCapFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_AheadFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AheadFSet_matches)],
jur_BehindFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BehindFSet_matches)],
jur_AtomicFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)],
jur_FinalSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FinalSet_matches)],
jur_LeafSet, 0, jur_AbstractSet, [], 1, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount0", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_EmptySet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find0", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
jur_JointSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_NonCapJointSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, 0, jur_NonCapJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext)],
jur_PositiveLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed)],
jur_NegativeLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed)],
jur_PositiveLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed)],
jur_NegativeLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed)],
jur_SingleSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find0", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
jl_ArrayStoreException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_SpecialToken, 0, jl_Object, [], 1, 0, 0, 0, 0,
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1, 0, 0, 0, ["$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$getInstance1", $rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI)],
jur_CharClass, "CharClass", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass_contains), "$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance1", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
ju_MissingResourceException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_QuantifierSet, 0, jur_AbstractSet, [], 1, 0, 0, 0, ["$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_LeafQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches)],
jur_CompositeQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches)],
jur_GroupQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches)],
jur_AltQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_UnifiedQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1, 0, 0, 0, 0,
jl_NumberFormatException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
jur_Quantifier, "Quantifier", 2, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, 0, ["$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
jur_FSet$PossessiveFSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, 0,
jur_LowHighSurrogateRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, 0,
jur_CompositeRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
jur_SupplRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$contains", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)]]);
$rt_metadata([jur_UCISupplRangeSet, 0, jur_SupplRangeSet, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UCISupplRangeSet_contains)],
jur_UCIRangeSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts)],
jur_RangeSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$first", $rt_wrapFunction1(jur_RangeSet_first)],
jur_HangulDecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)],
jur_CharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$charCount0", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find0", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$first", $rt_wrapFunction1(jur_CharSet_first)],
jur_UCICharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts)],
jur_CICharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CICharSet_accepts)],
jur_DecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_UCIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, 0, 0,
jur_CIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, 0, 0,
jur_PossessiveGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)],
jur_PosPlusGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jur_AltGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
jur_PosAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jur_CompositeGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches)],
jur_PosCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)],
jur_ReluctantGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jur_RelAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jur_RelCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
jur_DotAllQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotAllQuantifierSet_find)],
jur_DotQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotQuantifierSet_find)],
jur_AbstractLineTerminator, 0, jl_Object, [], 1, 0, 0, 0, 0,
jur_PossessiveQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
jur_PossessiveAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)],
jur_PossessiveCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
jur_ReluctantQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
jur_ReluctantAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jur_ReluctantCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
jur_SOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed)],
jur_WordBoundary, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed)],
jur_PreviousMatch, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed)],
jur_EOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed)],
jur_EOISet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed)],
jur_MultiLineSOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed)],
jur_DotAllSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_DotSet, 0, jur_JointSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotSet_matches), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
jur_UEOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed)],
jur_UMultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed)],
jur_MultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed)],
jur_CIBackReferenceSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_BackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find0", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first)],
jur_UCIBackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches)],
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuffer_insert), "$append2", $rt_wrapFunction3(jl_StringBuffer_append), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert2", $rt_wrapFunction2(jl_StringBuffer_insert0)],
jur_SequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find0", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$first", $rt_wrapFunction1(jur_SequenceSet_first)],
jur_UCISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts)],
jur_CISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts)],
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 4, 0, 0, 0, 0,
jur_UCISupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts)],
jur_LowSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_HighSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)]]);
$rt_metadata([jur_SupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find0", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, 0, 0,
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0, 0,
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)],
jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)],
jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)],
jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
otciu_UnicodeHelper$Range, 0, jl_Object, [], 0, 3, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0, 0,
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0, 0,
jur_AbstractCharClass$1, "AbstractCharClass$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
jur_AbstractCharClass$2, "AbstractCharClass$2", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_CharClass$18, "CharClass$18", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)]]);
$rt_metadata([jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$1_contains)],
jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$6_contains)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$9_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$8_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$11_contains)],
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$14_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$16_contains)],
jur_BackReferencedSingleSet, 0, jur_SingleSet, [], 0, 0, 0, 0, ["$find0", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, 0,
otcic_Console, 0, jl_Object, [], 4, 3, 0, 0, 0,
jur_MatchResult, 0, jl_Object, [], 3, 3, 0, 0, 0,
jur_Matcher, 0, jl_Object, [jur_MatchResult], 4, 3, 0, 0, 0,
jnc_CoderMalfunctionError, 0, jl_Error, [], 0, 3, 0, 0, 0,
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)],
jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)],
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)],
jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
jur_UnicodeCategory, "UnicodeCategory", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 2, jur_UnicodeCategory, [], 0, 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, 0, 0,
jl_UnsupportedOperationException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, 0,
jn_ReadOnlyBufferException, 0, jl_UnsupportedOperationException, [], 0, 3, 0, 0, 0,
jn_BufferOverflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jn_BufferUnderflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0, 0]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["@", "\\", "UTF-8", "IGNORE", "REPLACE", "REPORT", "BIG_ENDIAN", "LITTLE_ENDIAN", "null", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "String is null or empty", "Illegal radix: ", "_net_lax1dude_eaglercraft_sp_VirtualFilesystem_1_5_2", "COULD NOT INIT FILESYSTEM: ", "test1", "/test1", "/test2/", "test2/", "test2/teste", "\\test2\\teste", "\\test2\\teste\\..\\eag", "test2", "teste", "eag", "../", "../../", ".", "you/eag",
" you/ eag ", "\\yee\\", "yeeler", "yee", "yee2", "yee/deevler/", "yee/../../../../", "yee/../../deevler../../", "0", "/", "..", "Either src or dest is null", "The filesystem requested is already in use on a different tab.", "The IDBFactory.open() request failed, reason: ", "Virtual Filesystem Object: ", "IDBFactory threw an exception, IndexedDB is most likely not supported in this browser.", "", "\n\n", "Action must be non-null", "Replacement preconditions do not hold", "Index out of bounds", "open error",
"path", "IndexedDB is not supported in this browser", "New position ", " is outside of range [0;", "]", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", ")", "The last byte in src ", "Patter is null", "\\Q", "\\E", "\\\\E\\Q", "Is", "In", "{", ",", "}", "Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase", "javaWhitespace", "javaMirrored", "javaDefined", "javaDigit",
"javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar", "javaTitleCase", "javaUnicodeIdentifierPart", "javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A", "LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement", "Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement",
"Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan", "Myanmar", "Georgian", "HangulJamo", "Ethiopic", "EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid", "Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement", "CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional",
"GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols", "NumberForms", "Arrows", "MathematicalOperators", "MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing", "BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns", "SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B",
"SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended", "SupplementalPunctuation", "CJKRadicalsSupplement", "KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana", "Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility", "CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols",
"CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates", "LowSurrogates", "PrivateUseArea", "CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors", "VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all", "Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM",
"Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc", "Sk", "So", "Pi", "Pf"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (var i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : function(result) {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    var result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        var self = this;
        var callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(function() {
            self.resume();
        });
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
function $rt_suspending() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
}
function $rt_resuming() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
}
function $rt_suspend(callback) {
    var nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context (perhaps, from native JS method).");
    }
    return nativeThread.suspend(callback);
}
function $rt_startThread(runner, callback) {
    (new TeaVMThread(runner)).start(callback);
}
var $rt_currentNativeThread = null;
function $rt_nativeThread() {
    return $rt_currentNativeThread;
}
function $rt_invalidPointer() {
    throw new Error("Invalid recorded state");
}
main = $rt_mainStarter(nles_IntegratedServer_main);
main.javaException = $rt_javaException;
(function() {
    var c;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = nles_SYS$requestPersist$lambda$_2_0.prototype;
    c.complete = c.$complete$exported$0;
    c = nles_VirtualFilesystem$AsyncHandlers$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = nles_VirtualFilesystem$AsyncHandlers$2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = nles_VirtualFilesystem$AsyncHandlers$3.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = nles_VirtualFilesystem$AsyncHandlers$4.prototype;
    c.handleEvent = c.$handleEvent$exported$00;
    c = otjc_JSArray.prototype;
    c.getLength = c.$getLength$exported$1;
    c.get = c.$get$exported$0;
})();
})();
