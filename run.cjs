const fs=require('fs'); fs.writeFileSync('do_edit.cjs', fs.readFileSync('do_edit.cjs', 'utf8').replace(/.../, '...'));
