import { FaInstagram, FaGithub } from 'react-icons/fa';
import { IconStyle } from './custom_css/iconStyles';
import { CustomTooltip } from './custom_css/customTooltip';


export const Nav = () => {

    return (
    <Box>
        <List className="wrapper" display="inline-flex" listStyleType="none">
            <ListItem className="icon instagram" {...IconStyle}>
                <CustomTooltip as='span'>Instagram</CustomTooltip>
                <Box as='span'><FaInstagram /></Box>
            </ListItem>
            <ListItem className="icon github" {...IconStyle}>
                <CustomTooltip as='span'>Github</CustomTooltip>
                <Box as='span'><FaGithub /></Box>
            </ListItem>
        </List>
    </Box>
    
    );
}
