const fs = require("fs");
const p = "app/sfp2026/cv-builder/src/data/cvTemplates.ts";
let c = fs.readFileSync(p, "utf8");
const tIdx = c.indexOf("export const TRANSFORM_TEMPLATES");
if (tIdx === -1) throw new Error("not found");
const dyn = require("./dynamicData.json");

function getInnerBraces(txt, startIdx) {
  let braceStart = txt.indexOf("{", startIdx);
  if(braceStart === -1) return -1;
  let i = braceStart + 1;
  let bCount = 1;
  while(i < txt.length && bCount > 0) {
    if (txt[i] === "{") bCount++;
    if (txt[i] === "}") bCount--;
    i++;
  }
  return i;
}

for (let role in dyn) {
  let roleIdx = c.indexOf(`"${role}": {`, tIdx);
  if (roleIdx === -1) roleIdx = c.indexOf(`"${role}":\n  {`, tIdx);
  if (roleIdx === -1) { console.log("Missing role:", role); continue; }
  
  let roleEnd = getInnerBraces(c, roleIdx + role.length + 1);
  let roleBlock = c.substring(roleIdx, roleEnd);
  
  function replaceSection(block, secName, objData) {
    let sStart = block.indexOf(`"${secName}":`);
    if(sStart===-1) sStart = block.indexOf(`${secName}:`);
    if(sStart === -1) return block; // Need to append it? Actually cvTemplates has summary and projects everywhere.
    
    let sEnd = getInnerBraces(block, sStart + secName.length);
    
    let pre = block.substring(0, sStart);
    let post = block.substring(sEnd);
    
    // figure out indentation from the line before sStart
    let lineStart = block.lastIndexOf("\n", sStart);
    let indent = lineStart !== -1 ? block.substring(lineStart+1, sStart).replace(/[^\s]/g, "") : "    ";
    
    let injected = JSON.stringify(objData, null, 2);
    injected = injected.split("\n").map((l,i) => i===0 ? l : indent + l).join("\n");
    injected = `"${secName}": ` + injected;
    
    return pre + injected + post;
  }
  
  roleBlock = replaceSection(roleBlock, "summary", dyn[role].summary);
  roleBlock = replaceSection(roleBlock, "projects", dyn[role].projects);
  
  c = c.substring(0, roleIdx) + roleBlock + c.substring(roleEnd);
}

fs.writeFileSync(p, c, "utf8");
console.log("Applied roles!");

