import { Box, BoxProps } from '@kuma-ui/core'

export const Container = ({ children, ...boxProps }: BoxProps) => {
  return (
    <Box
      maxWidth="100%"
      width={['auto', 'auto', '723px', '933px', '1127px']}
      marginLeft={['0em', '1em', 'auto']}
      marginRight={['0em', '1em', 'auto']}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
