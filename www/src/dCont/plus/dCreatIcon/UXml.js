/**
© This code along with the PlainView software is strictly proprietary and owned by Slava Ivanov
of.slava@gmail.com
+358456041454
Any copying or usage without owner's permission is absolutely prohibited.
*/

///Перегонка с Xml >> Object
export class UXml {
    constructor() {
        this.type = "UXml";
        var self = this;
        self.key = "@";


        this.testToDOM = function(xmlStr) {
            xmlStr = xmlStr.replace("&amp;", '');
            return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
        }


        ///Возврощет с xml джейсон
        function xml2json(xml, tab) {
            var X = {
                toObj: function(xml) {
                    var o = {};
                    if (xml.nodeType == 1) { // element node ..
                        if (xml.attributes.length) // element with attributes  ..
                            for (var i = 0; i < xml.attributes.length; i++)
                                o[self.key + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                        // o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                        if (xml.firstChild) { // element has child nodes ..
                            var textChild = 0,
                                cdataChild = 0,
                                hasElementChild = false;
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 1) hasElementChild = true;
                                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                                else if (n.nodeType == 4) cdataChild++; // cdata section node
                            }
                            if (hasElementChild) {
                                if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                                        if (n.nodeType == 3) // text node
                                            o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4) // cdata node
                                            o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName]) { // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        } else // first occurence of element..
                                            o[n.nodeName] = X.toObj(n);
                                    }
                                } else { // mixed content
                                    if (!xml.attributes.length)
                                        o = X.escape(X.innerXml(xml));
                                    else
                                        o["#text"] = X.escape(X.innerXml(xml));
                                }
                            } else if (textChild) { // pure text
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            } else if (cdataChild) { // cdata
                                if (cdataChild > 1)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    for (var n = xml.firstChild; n; n = n.nextSibling)
                                        o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    } else if (xml.nodeType == 9) { // document.node
                        o = X.toObj(xml.documentElement);
                    } else
                        alert("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson: function(o, name, ind) {
                    var json = name ? ("\"" + name + "\"") : "";
                    if (o instanceof Array) {
                        for (var i = 0, n = o.length; i < n; i++)
                            o[i] = X.toJson(o[i], "", ind + "\t");
                        json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                    } else if (o == null)
                        json += (name && ":") + "null";
                    else if (typeof(o) == "object") {
                        var arr = [];
                        for (var m in o)
                            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                        json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                    } else if (typeof(o) == "string")
                        json += (name && ":") + "\"" + o.toString() + "\"";
                    else
                        json += (name && ":") + o.toString();
                    return json;
                },
                innerXml: function(node) {
                    var s = ""
                    if ("innerHTML" in node)
                        s = node.innerHTML;
                    else {
                        var asXml = function(n) {
                            var s = "";
                            if (n.nodeType == 1) {
                                s += "<" + n.nodeName;
                                for (var i = 0; i < n.attributes.length; i++)
                                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                                if (n.firstChild) {
                                    s += ">";
                                    for (var c = n.firstChild; c; c = c.nextSibling)
                                        s += asXml(c);
                                    s += "</" + n.nodeName + ">";
                                } else
                                    s += "/>";
                            } else if (n.nodeType == 3)
                                s += n.nodeValue;
                            else if (n.nodeType == 4)
                                s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c = node.firstChild; c; c = c.nextSibling)
                            s += asXml(c);
                    }
                    return s;
                },
                escape: function(txt) {
                    return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
                },
                removeWhite: function(e) {
                    e.normalize();
                    for (var n = e.firstChild; n;) {
                        if (n.nodeType == 3) { // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            } else
                                n = n.nextSibling;
                        } else if (n.nodeType == 1) { // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        } else // any other node
                            n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9) // document node
                xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
            return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        }


        ///из джеси в хмл
        function json2xml(o, tab) {
            var toXml = function(v, name, ind) {
                    var xml = "";
                    if (v instanceof Array) {
                        for (var i = 0, n = v.length; i < n; i++)
                            xml += ind + toXml(v[i], name, ind + "\t") + "\n";
                    } else if (typeof(v) == "object") {
                        var hasChild = false;
                        xml += ind + "<" + name;
                        for (var m in v) {
                            if (m.charAt(0) == self.key)
                                xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                            else
                                hasChild = true;
                        }
                        xml += hasChild ? ">" : "/>";
                        if (hasChild) {
                            for (var m in v) {
                                if (m == "#text")
                                    xml += v[m];
                                else if (m == "#cdata")
                                    xml += "<![CDATA[" + v[m] + "]]>";
                                else if (m.charAt(0) != self.key)
                                    xml += toXml(v[m], m, ind + "\t");
                            }
                            xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
                        }
                    } else {
                        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
                    }
                    return xml;
                },
                xml = "";
            for (var m in o)
                xml += toXml(o[m], m, "");
            return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
        }

        ///Из джеси в дейсон с сбросами дороботка 
        this.json2xmlGood = function(o) {
            let sah = 0
            let b, b1
            let s = json2xml(o, "");
            let s1 = '';
            let ssa
            for (var i = 0; i < s.length; i++) {
                if (s[i] == "<") {
                    b = false;
                    if (s[i + 1] != undefined) {
                        if (s[i + 1] == "/") {
                            sah--;
                            b = true
                        } else {

                        }
                    }
                    b1 = true;
                    if (i == 0) b1 = false

                    let ssa1 = getDo(i + 2)
                    if (ssa == ssa1) {
                        b1 = false
                        sah++;
                    }
                    if (b1) {
                        s1 += "\n"
                        s1 += plus(i)
                    }
                    s1 += s[i]

                    if (b) sah--;

                } else {
                    s1 += s[i]
                }
                if (s[i] == ">") {
                    if (s[i - 1] == "/") {
                        sah--;
                    }
                }
            }

            function getDo(p) {
                let r = ''
                for (var i = p; i < s.length; i++) {
                    if (s[i] == ">") {
                        break
                    }
                    if (s[i] == " ") {
                        break
                    }
                    if (s[i] == "/") {
                        break
                    }
                    r += s[i]
                }
                return r
            }

            function plus(p) {
                let r = ''
                for (var i = 0; i < sah; i++) {
                    r += "\t";
                }
                ssa = getDo(p + 1)
                sah++;
                return r
            }
            return s1;
        }

        
        this.json2xml = function(o) {
            return json2xml(o, " ")
        }

        this.xml2json = function(o) {
            return xml2json(o, "")
        }
    }
}