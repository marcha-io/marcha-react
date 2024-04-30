import React from 'react';

import supabase from '../../lib/supabase';

const SignUpPage: React.FC = () => {

  const signUpWithGoogle = async () =>{
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: "google"
    });

    if(error) console.log("error during sign up", error);
    else console.log("user signed up successfully", data)

  }

  return (
    <div>
      <button onClick={signUpWithGoogle}>Sign In With Google</button>
    </div>
  )

}

export default SignUpPage
