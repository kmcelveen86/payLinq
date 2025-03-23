import prisma from '@/lib/prisma'

export const getSessionById = async (id: string) => {
  const session = await prisma.session.findFirst({
    where: {
      userId: id,
    },
  });
  if (session) return session;
  return null;
};
export const getVerficationTokenByToken = async (token: string) => {
  try {
    const verficationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verficationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// export const getVerficationTokenByEmail = async (email: string) => {
//   try {
//     const verficationToken = await prisma.verificationToken.findFirst({
//       where: {
//         email,
//       },
//     });
//     return verficationToken;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
// export const getPasswordResetTokenByEmail = async (email: string) => {
//   try {
//     const passwordResetToken = await prisma.passwordResetToken.findFirst({
//       where: {
//         email,
//       },
//     });
//     return passwordResetToken;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
// export const getPasswordResetTokenByToken = async (token: string) => {
//   try {
//     const passwordResetToken = await prisma.passwordResetToken.findFirst({
//       where: {
//         token,
//       },
//     });
//     return passwordResetToken;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
