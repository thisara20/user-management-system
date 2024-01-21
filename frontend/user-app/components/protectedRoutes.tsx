import { ReactNode, useEffect } from 'react';
import router from 'next/router'; 
import { useRouter } from 'next/navigation';
 
export default function protectedRoutes(Component : any ){
  return function protectedRoutes(props:any){
   // const auth = localStorage.getItem('token');
    const router = useRouter();
      useEffect(() => {
    const auth = localStorage.getItem('token');

    if (!auth) {
      router.push('/');
    }
  }, []);

  return <Component {...props}/>;
};

    
  }
 
