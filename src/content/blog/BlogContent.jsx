import React, { useMemo } from 'react';
import { useLang } from '../../lang';

/**
 * BlogContent wrapper component
 * Conditionally renders English or German blog content based on current language
 *
 * @param {React.ReactNode} englishComponent - The English version of the blog content
 * @param {React.ReactNode} germanComponent - The German version of the blog content
 * @returns {React.ReactNode} - The appropriate component based on current language
 */
export const BlogContent = ({ englishComponent, germanComponent }) => {
  const { lang } = useLang();

  // Memoize component selection to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (lang === 'de' && germanComponent) {
      return germanComponent;
    }
    return englishComponent;
  }, [lang, englishComponent, germanComponent]);

  return content;
};
