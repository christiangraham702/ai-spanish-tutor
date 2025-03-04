'use client';

import { ReactNode } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationMenu className="py-4">
            <NavigationMenuList className="flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                  Grammar Concepts
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[200px] bg-white shadow-lg rounded-lg">
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/grammar/preterite">
                        Preterite Tense
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/grammar/past-tenses">
                        Past Tenses
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/grammar/formal">
                        Formal Conjugations
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                  Vocabulary
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[200px] bg-white shadow-lg rounded-lg">
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/vocabulary/food">
                        Food
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/vocabulary/health">
                        Health & Body Parts
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                  Strategies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-4 w-[200px] bg-white shadow-lg rounded-lg">
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/strategies/reading">
                        Reading Strategies
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md" href="/strategies/listening">
                        Listening Strategies
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Spanish Exam Review. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 