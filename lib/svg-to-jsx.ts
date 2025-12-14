
/**
 * Converts a kebab-case string to camelCase
 */
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

/**
 * React-specific attribute mappings that don't follow standard camelCase rules
 * or are special cases.
 */
const REACT_ATTRIBUTE_MAP: Record<string, string> = {
  'class': 'className',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
  'xml:space': 'xmlSpace',
};

/**
 * Converts an SVG style string to a React style object string
 * e.g. "fill: red; stroke-width: 2" -> {{ fill: "red", strokeWidth: "2" }}
 */
const convertStyleToReact = (styleStr: string): string => {
  const rules = styleStr.split(';').filter(r => r.trim());
  if (rules.length === 0) return '';
  
  const props = rules.map(rule => {
    const [prop, ...valParts] = rule.split(':');
    if (!prop || valParts.length === 0) return null;
    
    const key = toCamelCase(prop.trim());
    const val = valParts.join(':').trim();
    
    // Check if value is a number
    const isNumber = !isNaN(Number(val)) && val !== '';
    return `${key}: "${val}"`;
  }).filter(Boolean);

  return `{{ ${props.join(', ')} }}`;
};

const convertAttributes = (node: Element): string => {
  const attrs: string[] = [];
  
  Array.from(node.attributes).forEach(attr => {
    const name = attr.name;
    const value = attr.value;
    
    if (name.startsWith('data-')) return; // Skip data attributes if mostly internal
    
    if (name === 'style') {
      const styleObj = convertStyleToReact(value);
      if (styleObj) {
        attrs.push(`style=${styleObj}`);
      }
      return;
    }

    const propName = REACT_ATTRIBUTE_MAP[name] || toCamelCase(name);
    
    // Handle specific boolean values or numbers if needed, 
    // but for "Raw JSX" strings, string props are usually fine and safer.
    // e.g. strokeWidth="2" is valid in React.
    
    attrs.push(`${propName}="${value}"`);
  });

  return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
};

const indent = (level: number) => '  '.repeat(level);

const walkNode = (node: Element, level: number): string => {
  const tagName = node.tagName.toLowerCase();
  const attributes = convertAttributes(node);
  
  if (node.children.length === 0 && !node.textContent?.trim()) {
    return `${indent(level)}<${tagName}${attributes} />`;
  }

  let childrenJsx = '';
  
  // Process children elements
  if (node.children.length > 0) {
    childrenJsx = '\n' + Array.from(node.children)
      .map(child => walkNode(child, level + 1))
      .join('\n') + '\n' + indent(level);
  } else if (node.textContent?.trim()) {
      // Process text content
      childrenJsx = node.textContent.trim();
  }

  return `${indent(level)}<${tagName}${attributes}>${childrenJsx}</${tagName}>`;
};

export const svgStringToJsx = (svgString: string, componentName: string = "Logo"): string => {
  if (typeof DOMParser === 'undefined') {
    throw new Error('DOMParser is not available. This function runs in the browser.');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = doc.documentElement;

  if (svgElement.tagName.toLowerCase() !== 'svg') {
      // Sometimes parseFromString fails silently or wraps in something else
      throw new Error('Invalid SVG string');
  }

  const jsxContent = walkNode(svgElement, 2).trim();

  return `export const ${componentName} = () => (
  ${jsxContent}
);`;
};

