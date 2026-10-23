"use client";

import {useState, type ComponentType} from 'react';
import type {LucideProps} from 'lucide-react';
import '../../styles/gradient-menu.css';

export type GradientMenuItem = {
  id: string;
  /** Real user copy. Omit only for an explicitly labelled structural preview. */
  title?: string;
  accessibleLabel: string;
  icon: ComponentType<LucideProps>;
  onSelect?: () => void;
};

export type GradientMenuProps = {
  items: readonly GradientMenuItem[];
  ariaLabel: string;
  /** Optional controlled state for deterministic previews. */
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
};

/** Donor: supplied 21st.dev menu. Preserve expansion + icon/title exchange.
 * No donor demo data or colour tokens. Uses existing lucide-react dependency.
 */
export default function GradientMenu({items, ariaLabel, activeId, onActiveChange}: GradientMenuProps) {
  const [localActive, setLocalActive] = useState<string | null>(null);
  const current = activeId === undefined ? localActive : activeId;
  const activate = (id: string | null) => {
    setLocalActive(id);
    onActiveChange?.(id);
  };

  return (
    <ul className="motion-menu" aria-label={ariaLabel}>
      {items.map(({id, title, accessibleLabel, icon: Icon, onSelect}) => (
        <li key={id} className="motion-menu__item" data-active={current === id}>
          <button type="button" className="motion-menu__button"
            aria-label={accessibleLabel}
            onPointerEnter={(event) => {if (event.pointerType !== 'touch') activate(id);}}
            onPointerLeave={(event) => {
              if (event.pointerType !== 'touch' && event.currentTarget !== document.activeElement) activate(null);
            }}
            onFocus={() => activate(id)}
            onBlur={() => activate(null)}
            onKeyDown={(event) => {if (event.key === 'Escape') activate(null);}}
            onClick={() => {activate(id); onSelect?.();}}>
            <span className="motion-menu__wash" aria-hidden="true" />
            <Icon className="motion-menu__icon" data-has-title={Boolean(title)} aria-hidden="true" size={24} strokeWidth={1.5} />
            {title && <span className="motion-menu__title" aria-hidden="true">{title}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
