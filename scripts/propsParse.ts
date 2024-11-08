// parseMantineProps.ts
import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';

const __dirname = path.resolve();

function parseTypeScriptFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const result: any = {
    props: {},
    styleApi: []
  };

  // Helper function to process interfaces
  function processInterface(node: ts.InterfaceDeclaration) {
    if (node.name.text.includes('Props')) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(sourceFile);
          const propType = member.type?.getText(sourceFile);

          if (propType) {
            // Handle different types of props
            if (propType.includes('MantineSize')) {
              result.props[propName] = ['xs', 'sm', 'md', 'lg', 'xl'];
            } else if (propType.includes('MantineNumberSize')) {
              result.props[propName] = 'number';
            } else if (propType.includes('MantineRadius')) {
              result.props[propName] = ['xs', 'sm', 'md', 'lg', 'xl'];
            } else if (propType.includes('MantineSpacing')) {
              result.props[propName] = ['xs', 'sm', 'md', 'lg', 'xl'];
            } else if (propType.includes('MantineShadow')) {
              result.props[propName] = ['xs', 'sm', 'md', 'lg', 'xl'];
            } else if (propType.includes('MantineColor')) {
              result.props[propName] = 'color';
            } else if (propType.includes('boolean')) {
              result.props[propName] = 'boolean';
            } else if (propType.includes('string')) {
              result.props[propName] = 'string';
            } else if (propType.includes('|')) {
              // Handle union types
              const options = propType
                .split('|')
                .map(opt => opt.trim().replace(/'/g, '').replace(/\s/g, ''))
                .filter(opt => opt !== 'undefined');
              result.props[propName] = options;
            }
          }
        }
      });
    }
  }

  // Helper function to process type aliases
  function processTypeAlias(node: ts.TypeAliasDeclaration) {
    if (node.name.text.includes('StylesNames')) {
      const typeText = node.type.getText(sourceFile);
      const styleNames = typeText
        .split('|')
        .map(style => style.trim().replace(/'/g, '').replace(/\s/g, ''))
        .filter(style => style !== 'undefined');
      result.styleApi = styleNames;
    }
    if(node.name.text.includes('CssVariables')) {
      const typeText = node.type.getText(sourceFile);
      const cssVars = typeText
        .split('|')
        .map(style => style.trim().replace(/'/g, '').replace(/\s/g, ''))
        .filter(style => style !== 'undefined');
      result.cssVars = cssVars;
    }
    if(node.name.text.includes('Variant')) {
      const typeText = node.type.getText(sourceFile);
      const variant = typeText
        .split('|')
        .map(style => style.trim().replace(/'/g, '').replace(/\s/g, ''))
        .filter(style => style !== 'undefined');
      result.props.variant = variant;
    }
  }

  // Walk through the AST
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      processInterface(node);
    } else if (ts.isTypeAliasDeclaration(node)) {
      processTypeAlias(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

// Main function to process all component files
async function generateMantineProps() {
  const componentsDir = path.join(__dirname, 'node_modules/@mantine/core/lib/components');
  const componentDirs = fs.readdirSync(componentsDir);
  
  const result: Record<string, any> = {};

  for (const componentDir of componentDirs) {
    const componentPath = path.join(componentsDir, componentDir);
    if (fs.statSync(componentPath).isDirectory()) {
      const files = fs.readdirSync(componentPath);
      const dtsFile = files.find(f => f.toLowerCase() === `${componentDir.toLowerCase()}.d.ts`);
      
      if (dtsFile) {
        const filePath = path.join(componentPath, dtsFile);
        result[componentDir] = parseTypeScriptFile(filePath);
      }
    }
  }

  // Write result to JSON file
  fs.writeFileSync(
    'mantineProps.json',
    JSON.stringify(result, null, 2)
  );
}

generateMantineProps().catch(console.error);