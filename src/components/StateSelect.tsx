import { Flex, Select } from '@radix-ui/themes'

export function StateSelect({ setState, state }: StateSelectProps) {
  return (
    <Flex direction={'column'} gap={'1'}>
      <label htmlFor="state">State</label>
      <Select.Root value={state ?? ''} onValueChange={setState}>
        <Select.Trigger placeholder="Choose a breed" id="state" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Choose a State</Select.Label>
            <Select.Item value="AL">Alabama</Select.Item>
            <Select.Item value="AK">Alaska</Select.Item>
            <Select.Item value="AS">American Samoa</Select.Item>
            <Select.Item value="AZ">Arizona</Select.Item>
            <Select.Item value="AR">Arkansas</Select.Item>
            <Select.Item value="CA">California</Select.Item>
            <Select.Item value="CO">Colorado</Select.Item>
            <Select.Item value="CT">Connecticut</Select.Item>
            <Select.Item value="DE">Delaware</Select.Item>
            <Select.Item value="DC">District of Columbia</Select.Item>
            <Select.Item value="FL">Florida</Select.Item>
            <Select.Item value="GA">Georgia</Select.Item>
            <Select.Item value="GU">Guam</Select.Item>
            <Select.Item value="HI">Hawaii</Select.Item>
            <Select.Item value="ID">Idaho</Select.Item>
            <Select.Item value="IL">Illinois</Select.Item>
            <Select.Item value="IN">Indiana</Select.Item>
            <Select.Item value="IA">Iowa</Select.Item>
            <Select.Item value="KS">Kansas</Select.Item>
            <Select.Item value="KY">Kentucky</Select.Item>
            <Select.Item value="LA">Louisiana</Select.Item>
            <Select.Item value="ME">Maine</Select.Item>
            <Select.Item value="MD">Maryland</Select.Item>
            <Select.Item value="MA">Massachusetts</Select.Item>
            <Select.Item value="MI">Michigan</Select.Item>
            <Select.Item value="MN">Minnesota</Select.Item>
            <Select.Item value="MS">Mississippi</Select.Item>
            <Select.Item value="MO">Missouri</Select.Item>
            <Select.Item value="MT">Montana</Select.Item>
            <Select.Item value="NE">Nebraska</Select.Item>
            <Select.Item value="NV">Nevada</Select.Item>
            <Select.Item value="NH">New Hampshire</Select.Item>
            <Select.Item value="NJ">New Jersey</Select.Item>
            <Select.Item value="NM">New Mexico</Select.Item>
            <Select.Item value="NY">New York</Select.Item>
            <Select.Item value="NC">North Carolina</Select.Item>
            <Select.Item value="ND">North Dakota</Select.Item>
            <Select.Item value="MP">Northern Mariana Islands</Select.Item>
            <Select.Item value="OH">Ohio</Select.Item>
            <Select.Item value="OK">Oklahoma</Select.Item>
            <Select.Item value="OR">Oregon</Select.Item>
            <Select.Item value="PA">Pennsylvania</Select.Item>
            <Select.Item value="PR">Puerto Rico</Select.Item>
            <Select.Item value="RI">Rhode Island</Select.Item>
            <Select.Item value="SC">South Carolina</Select.Item>
            <Select.Item value="SD">South Dakota</Select.Item>
            <Select.Item value="TN">Tennessee</Select.Item>
            <Select.Item value="TX">Texas</Select.Item>
            <Select.Item value="UM">
              United States Minor Outlying Islands
            </Select.Item>
            <Select.Item value="VI">United States Virgin Islands</Select.Item>
            <Select.Item value="UT">Utah</Select.Item>
            <Select.Item value="VT">Vermont</Select.Item>
            <Select.Item value="VA">Virginia</Select.Item>
            <Select.Item value="WA">Washington</Select.Item>
            <Select.Item value="WV">West Virginia</Select.Item>
            <Select.Item value="WI">Wisconsin</Select.Item>
            <Select.Item value="WY">Wyoming</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export interface StateSelectProps {
  setState: (state: string) => void
  state: string
}
