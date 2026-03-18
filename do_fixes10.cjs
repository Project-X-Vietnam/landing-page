
const fs = require('fs'); 
let t = fs.readFileSync('app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx', 'utf8');

t = t.replace('onSetLevel,', 'onSetLevel,\n    onBack,');
t = t.replace('<span\n            style={{\n              fontSize: 13,\n              fontWeight: 600,\n              color: \#020818\,\n            }}\n          >', '<button onClick={onBack} style={{ background: \
one\, border: \
one\, cursor: \pointer\, padding: \6px\, marginRight: \26px\, borderRadius: \6px\, display: \lex\, alignItems: \center\, justifyContent: \center\, transition: \ackground 0.2s\ }}><ArrowRight size={18} style={{ transform: \otate(180deg)\, color: \#64748B\ }} /></button>\n          <span\n            style={{\n              fontSize: 13,\n              fontWeight: 600,\n              color: \#020818\,\n            }}\n          >');

t = t.replace('{/* ── Continue ── */}\n            <div\n              style={{\n                borderTop: \1px solid #F1F5F9\,\n                paddingTop: 18,\n                display: \lex\,\n                justifyContent: \lex-end\,\n              }}\n            >', '{/* ── Continue ── */}\n            <AnimatePresence>\n             {allChecked && (\n            <motion.div\n              initial={{ opacity: 0, height: 0, marginTop: 0 }}\n              animate={{ opacity: 1, height: \uto\, marginTop: 18 }}\n              exit={{ opacity: 0, height: 0 }}\n              style={{\n                borderTop: \1px solid #F1F5F9\,\n                paddingTop: 18,\n                display: \lex\,\n                justifyContent: \lex-end\,\n                overflow: \hidden\\n              }}\n            >');

t = t.replace('Continue to iterate?\n                <ArrowRight size={13} strokeWidth={2.5} />\n              </motion.button>\n            </div>\n          </motion.div>\n        </AnimatePresence>\n      </div>\n    </>\n  );\n}', 'Continue to iterate?\n                <ArrowRight size={13} strokeWidth={2.5} />\n              </motion.button>\n            </motion.div>\n            )}\n            </AnimatePresence>\n          </motion.div>\n        </AnimatePresence>\n      </div>\n    </>\n  );\n}');

t = t.replace(/At mid-level, your CV should show impact, not just activity.*Quantify your impact wherever possible./s, 'Your CV should focus on your potential, what you did, and what you achieved. I\\'m not looking for a seasoned expert, but I want to see your drive and ability to learn quickly.');
t = t.replace(/Mid-Level/g, 'Junior / Intern');

fs.writeFileSync('app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx', t);

