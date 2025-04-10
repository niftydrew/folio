import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import { socials } from '../constants/socials';

interface AutoResponseEmailProps {
  name: string;
  message: string;
  profileImageBase64?: string;
}

export const AutoResponseEmail = ({
  name,
  message,
}: AutoResponseEmailProps) => {
  // Use the base64 image if provided, otherwise use a fallback URL
  const profileImageUrl =
    'https://res.cloudinary.com/djdlkcrfv/image/upload/v1744298943/pfp_cbcfvu.png';

  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out, {name}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <table style={imageTable}>
              <tr>
                <td align="center">
                  <Img
                    src={profileImageUrl}
                    width='100'
                    height='100'
                    alt='0xDrew'
                    style={profileImage}
                  />
                </td>
              </tr>
            </table>
          </Section>
          <Heading style={heading}>Thanks for reaching out</Heading>
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Thank you for contacting me through my portfolio website. I've
            received your message and will get back to you as soon as possible,
            typically within 24-48 hours.
          </Text>

          <Section style={messageQuoteSection}>
            <Text style={messageHeading}>Your message:</Text>
            <Text style={messageQuote}>{message}</Text>
          </Section>

          <Text style={paragraph}>
            In the meantime, feel free to connect with me on social media or
            check out more of my work:
          </Text>

          <Section style={socialSection}>
            <Link
              href={socials[0].href}
              style={socialIconLink}
            >
              <Img
                src='https://cdn-icons-png.flaticon.com/512/5969/5969020.png'
                width='24'
                height='24'
                alt='Twitter'
                style={socialIcon}
              />
            </Link>
            <Link
              href={socials[1].href}
              style={socialIconLink}
            >
              <Img
                src='https://cdn-icons-png.flaticon.com/512/2111/2111432.png'
                width='24'
                height='24'
                alt='GitHub'
                style={socialIcon}
              />
            </Link>
            <Link
              href={socials[2].href}
              style={socialIconLink}
            >
              <Img
                src='https://cdn-icons-png.flaticon.com/512/3670/3670074.png'
                width='24'
                height='24'
                alt='Dribbble'
                style={socialIcon}
              />
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Best regards,
            <br />
            0xDrew
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const imageTable = {
  width: '100%',
  margin: '20px 0',
};

const profileImage = { 
  borderRadius: '50%',
  display: 'block',
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  color: '#333',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '20px 0',
};

const paragraph = { fontSize: '16px', lineHeight: '26px', color: '#444' };

const messageQuoteSection = {
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #333',
  padding: '12px 16px',
  margin: '24px 0',
  borderRadius: '4px',
};

const messageHeading = { fontSize: '14px', color: '#666', margin: '0 0 8px 0' };

const messageQuote = {
  fontSize: '15px',
  fontStyle: 'italic',
  color: '#555',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const socialSection = { margin: '24px 0', textAlign: 'center' as const };

const socialIconLink = {
  textDecoration: 'none',
  margin: '0 10px',
  display: 'inline-block',
};

const socialIcon = {
  border: 'none',
};

const hr = { borderColor: '#e6ebf1', margin: '24px 0' };

const footer = {
  fontSize: '14px',
  color: '#666',
  textAlign: 'left' as const,
  marginTop: '16px',
};

export default AutoResponseEmail;
