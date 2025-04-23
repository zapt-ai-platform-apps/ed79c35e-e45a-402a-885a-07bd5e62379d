import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';

export const AuthForm = () => {
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">Sign in with ZAPT</h2>
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Learn more about ZAPT
        </a>
      </div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
      />
    </div>
  );
};