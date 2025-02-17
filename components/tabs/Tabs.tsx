'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

interface ITab<T> {
  label: string;
  value: T;
}

interface TabsComponentProps<T> {
  tabs: ITab<T>[];
  onTabClick: (tabValue: T) => void;
  currentTab: T;
}

export const Tabs = <T extends string = string>({
  tabs,
  onTabClick,
  currentTab,
}: TabsComponentProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: T) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value as string);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (!searchParams.get('tab')) {
      const defaultTab = tabs[0]?.value;
      if (defaultTab) {
        router.replace(`${pathname}?${createQueryString('tab', defaultTab)}`);
      }
    }
  }, [searchParams, pathname, router, tabs, createQueryString]);

  const handleTabClick = (tabValue: T) => {
    router.push(`${pathname}?${createQueryString('tab', tabValue)}`);
    onTabClick(tabValue);
  };

  return (
    <div className="flex overflow-auto justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`relative w-full px-4 py-2 ${
            currentTab === tab.value ? 'text-accent-100' : 'text-accent-200'
          }`}
        >
          {tab.label}
          {currentTab === tab.value && (
            <motion.span
              layoutId="undeline"
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-200`}
              style={{ bottom: '0.05rem' }}
            ></motion.span>
          )}
        </button>
      ))}
    </div>
  );
};
