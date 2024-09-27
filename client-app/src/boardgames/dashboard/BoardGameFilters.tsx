
import { Menu, Header } from 'semantic-ui-react';


export default function BoardGameFilters() {
    return (    
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Boardgames' />
                <Menu.Item content="Owned boardgames" />
            </Menu>
           

        </>
    );
}