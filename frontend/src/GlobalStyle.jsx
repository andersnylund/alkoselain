import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --background-white: hsl(0, 0%, 99.5%);

        --grey-1: hsl(0, 0%, 10%);
        --grey-2: hsl(0, 0%, 20%);
        --grey-3: hsl(0, 0%, 30%);
        --grey-4: hsl(0, 0%, 40%);
        --grey-5: hsl(0, 0%, 50%);
        --grey-6: hsl(0, 0%, 60%);
        --grey-7: hsl(0, 0%, 70%);
        --grey-8: hsl(0, 0%, 80%);
        --grey-9: hsl(0, 0%, 90%);
        
        --box-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        --box-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        --box-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        --box-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

        --size-1: 0.25rem;
        --size-2: 0.5rem;
        --size-3: 0.75rem;
        --size-4: 1rem;
        --size-5: 1.5rem;
        --size-6: 2rem;
        --size-7: 3rem;
        --size-8: 4rem;
        --size-9: 6rem;
        --size-10: 8rem;
        --size-11: 12rem;
        --size-12: 16rem;
        --size-13: 24rem;
        --size-14: 32rem;
        --size-15: 40rem;
        --size-16: 48rem;
    }
`;
