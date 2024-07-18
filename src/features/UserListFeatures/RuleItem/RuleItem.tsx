import AlertIcon from "../../../shared/media/Alert.svg";


interface RuleProps {
    rule: {
        id: number;
        user_id: number;
        currency: {
            name: string;
        };
        alert_rate: number;
        rule_status: boolean;
    };
}

export const RuleItem = ({ rule }: RuleProps) => {
    return (
        <div>
        <div className='bg-viat-secondary shadow-md rounded-md p-4 mt-4'>
            <div className='flex items-center space-x-2'>
                <img src={AlertIcon.toString()} alt='User Icon' className='h-10 w-10'/>
                <div className='flex flex-col space-y-1'>
                    <div className='font-viat-small text-viat-size-body text-viat-text'>
                        {/*TODO: Make link and show username*/}
                        <div>Currency: {rule.currency.name}</div>
                        <div>Rule Rate: {rule.alert_rate}</div>
                    </div>
                </div>
            </div>
        </div>

        </div>
)
    ;
};
