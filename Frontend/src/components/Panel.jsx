import React from 'react';

/**
 * Panel component representing the core neobrutalist panel primitive.
 * Composes borders and shadow offsets according to the specified shadow type.
 */
export default function Panel({
  children,
  className = '',
  shadowType = 'default', // 'default' | 'violet' | 'lima'
  onClick,
  style = {},
  ...props
}) {
  let shadowClass = '';
  switch (shadowType) {
    case 'violet':
      shadowClass = 'shadow-[var(--shadow-violet)]';
      break;
    case 'lima':
      shadowClass = 'shadow-[var(--shadow-lima)]';
      break;
    case 'default':
    default:
      shadowClass = 'shadow-[var(--shadow-default)]';
      break;
  }

  // We write simple inline styles or CSS classes. Since we are using Vanilla CSS:
  // Let's implement style classes in index.css or write them inline here.
  // We can write custom styles dynamically based on shadow type:
  const getShadowStyle = () => {
    switch (shadowType) {
      case 'violet':
        return { boxShadow: 'var(--shadow-violet)' };
      case 'lima':
        return { boxShadow: 'var(--shadow-lima)' };
      case 'default':
      default:
        return { boxShadow: 'var(--shadow-default)' };
    }
  };

  const combinedStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    ...getShadowStyle(),
    ...style
  };

  return (
    <div
      className={`retro-panel ${className}`}
      style={combinedStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
