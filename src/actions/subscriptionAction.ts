'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import isEmail from 'validator/lib/isEmail';

const SIMULATION_DELAY = 1000;

async function subscriptionAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  await new Promise((resolve) => setTimeout(resolve, SIMULATION_DELAY));

  if (!isEmail(email)) {
    return { success: false, error: true, message: 'Valid email required' };
  }

  revalidatePath('/');

  const encodedEmail = encodeURIComponent(email);

  redirect(`/confirmation?email=${encodedEmail}`);
}

export default subscriptionAction;
