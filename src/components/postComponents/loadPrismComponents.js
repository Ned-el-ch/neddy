import Prism from "prismjs"

const loadSupportedLanguages = () => {
	// LAOD RUBY
	(function(){
		Prism.languages.ruby = Prism.languages.extend('clike', {
			'comment': [
				/#.*/,
				{
					pattern: /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
					greedy: true
				}
			],
			'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
		});
		var interpolation = {
			pattern: /#\{[^}]+\}/,
			inside: {
				'delimiter': {
					pattern: /^#\{|\}$/,
					alias: 'tag'
				},
				rest: Prism.languages.ruby
			}
		};
		Prism.languages.insertBefore('ruby', 'keyword', {
			'regex': [
				{
					pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					// Here we need to specifically allow interpolation
					pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
					lookbehind: true,
					greedy: true
				}
			],
			'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
			'symbol': {
				pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
				lookbehind: true
			}
		});
		Prism.languages.insertBefore('ruby', 'number', {
			'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
			'constant': /\b[A-Z]\w*(?:[?!]|\b)/
		});
		Prism.languages.ruby.string = [
			{
				pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				// Here we need to specifically allow interpolation
				pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			}
		];
	})();
	// LOAD PYTHON
	(function(){
		Prism.languages.python = {
		'comment': {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true
		},
		'triple-quoted-string': {
			pattern: /("""|''')[\s\S]+?\1/,
			greedy: true,
			alias: 'string'
		},
		'string': {
			pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'function': {
			pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
			lookbehind: true
		},
		'class-name': {
			pattern: /(\bclass\s+)\w+/i,
			lookbehind: true
		},
		'keyword': /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
		'builtin':/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
		'boolean': /\b(?:True|False|None)\b/,
		'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
		'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
		'punctuation': /[{}[\];(),.:]/
	}
	})();
	// LOAD JAVA
	(function() {
	
		var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
	
		// based on the java naming conventions
		var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
	
		Prism.languages.java = Prism.languages.extend('clike', {
			'class-name': [
				className,
	
				// variables and parameters
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				/\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
			],
			'keyword': keywords,
			'function': [
				Prism.languages.clike.function,
				{
					pattern: /(\:\:)[a-z_]\w*/,
					lookbehind: true
				}
			],
			'number': /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
			'operator': {
				pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
				lookbehind: true
			}
		});
	
		Prism.languages.insertBefore('java', 'string', {
			'triple-quoted-string': {
				// http://openjdk.java.net/jeps/355#Description
				pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
				greedy: true,
				alias: 'string'
			}
		});
	
		Prism.languages.insertBefore('java', 'class-name', {
			'annotation': {
				alias: 'punctuation',
				pattern: /(^|[^.])@\w+/,
				lookbehind: true
			},
			'namespace': {
				pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,
				lookbehind: true,
				inside: {
					'punctuation': /\./,
				}
			},
			'generics': {
				pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
				inside: {
					'class-name': className,
					'keyword': keywords,
					'punctuation': /[<>(),.:]/,
					'operator': /[?&|]/
				}
			}
		});
	})();
	// LOAD JSX
	(function() {
	
		var javascript = Prism.util.clone(Prism.languages.javascript);
		
		Prism.languages.jsx = Prism.languages.extend('markup', javascript);
		Prism.languages.jsx.tag.pattern= /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i;
		
		Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/i;
		Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i;
		Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
		
		Prism.languages.insertBefore('inside', 'attr-name', {
			'spread': {
				pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
				inside: {
					'punctuation': /\.{3}|[{}.]/,
					'attr-value': /\w+/
				}
			}
		}, Prism.languages.jsx.tag);
		
		Prism.languages.insertBefore('inside', 'attr-value',{
			'script': {
				// Allow for two levels of nesting
				pattern: /=(?:\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
				inside: {
					'script-punctuation': {
						pattern: /^=(?={)/,
						alias: 'punctuation'
					},
					rest: Prism.languages.jsx
				},
				'alias': 'language-javascript'
			}
		}, Prism.languages.jsx.tag);
		
		// The following will handle plain text inside tags
		var stringifyToken = function (token) {
			if (!token) {
				return '';
			}
			if (typeof token === 'string') {
				return token;
			}
			if (typeof token.content === 'string') {
				return token.content;
			}
			return token.content.map(stringifyToken).join('');
		};
		
		var walkTokens = function (tokens) {
			var openedTags = [];
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				var notTagNorBrace = false;
		
				if (typeof token !== 'string') {
					if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
						// We found a tag, now find its kind
		
						if (token.content[0].content[0].content === '</') {
							// Closing tag
							if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
								// Pop matching opening tag
								openedTags.pop();
							}
						} else {
							if (token.content[token.content.length - 1].content === '/>') {
								// Autoclosed tag, ignore
							} else {
								// Opening tag
								openedTags.push({
									tagName: stringifyToken(token.content[0].content[1]),
									openedBraces: 0
								});
							}
						}
					} else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
		
						// Here we might have entered a JSX context inside a tag
						openedTags[openedTags.length - 1].openedBraces++;
		
					} else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
		
						// Here we might have left a JSX context inside a tag
						openedTags[openedTags.length - 1].openedBraces--;
		
					} else {
						notTagNorBrace = true
					}
				}
				if (notTagNorBrace || typeof token === 'string') {
					if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
						// Here we are inside a tag, and not inside a JSX context.
						// That's plain text: drop any tokens matched.
						var plainText = stringifyToken(token);
		
						// And merge text with adjacent text
						if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
							plainText += stringifyToken(tokens[i + 1]);
							tokens.splice(i + 1, 1);
						}
						if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
							plainText = stringifyToken(tokens[i - 1]) + plainText;
							tokens.splice(i - 1, 1);
							i--;
						}
		
						tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
					}
				}
		
				if (token.content && typeof token.content !== 'string') {
					walkTokens(token.content);
				}
			}
		};
		
		Prism.hooks.add('after-tokenize', function (env) {
			if (env.language !== 'jsx' && env.language !== 'tsx') {
				return;
			}
			walkTokens(env.tokens);
		});
		
	})();
}

export default loadSupportedLanguages