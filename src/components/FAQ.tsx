import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'

export default function FAQ() {
    return (
        <Card className="mb-6 border-border bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-2xl">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-medium cursor-pointer">How to do text search?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <p className="mb-4">
                                Using KeyWord whitelist and Keyword blacklist you can configure which keywords have to be within the title/description of a
                                listing and which are not allowed.
                            </p>
                            <p>
                                For example, let&apos;s say you want a BMW without any accidents, you can add &quot;BMW&quot; to the whitelist and
                                &quot;accident&quot; to the blacklist. Note that all filters have to match and it&apos;s currently only possible to add one
                                keyword per filter.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-medium cursor-pointer">I got another question</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <p className="mb-4">We organize the development of this via discord.</p>
                            <p>Feel free to ask any questions or give feedback.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
