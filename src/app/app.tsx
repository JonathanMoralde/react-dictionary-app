import Header from "@/components/header/header";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Search, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomBullet from "@/components/custom-bullet/custom-bullet";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  word: z.string(),
});

type Props = {};

export interface WordData {
  license: License;
  meanings: Meaning[];
  phonetic: string;
  phonetics: Phonetic[];
  sourceUrls: string[];
  word: string;
}

export interface License {
  name: string;
  url: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  antonyms: string[];
  synonyms: string[];
}

export interface Definition {
  antonyms: string[];
  definition: string;
  synonyms: string[];
}

export interface Phonetic {
  text: string;
  audio: string;
  sourceUrl: string;
  license: License;
}

const Home = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  });
  const [data, setData] = useState<WordData[] | undefined>();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.word) {
      setData(undefined);
    }
    try {
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

      const result = await axios.get(url + values.word);

      setData(result.data as WordData[]);

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollArea className="max-w-screen-sm mx-auto px-5 py-5">
      <Header />

      <main>
        <section className="py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter a word"
                          {...field}
                          className="pr-12 bg-neutral-200 dark:bg-neutral-700 dark:border-none rounded-xl"
                        />

                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-0 dark:text-purple-500"
                        >
                          <Search />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>
        {data &&
          data.map((word, index) => {
            return (
              <section key={`${word.word}-${index}`}>
                <article>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{word.word}</h1>
                      <h3 className="text-purple-500 text-lg">
                        {word.phonetic}
                      </h3>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-purple-200 rounded-full"
                        onClick={() => {
                          if (word.phonetics[0].audio) {
                            let audio = new Audio(word.phonetics[0].audio);
                            audio.play();
                          }
                        }}
                      >
                        <Play className="text-purple-500" size={14} />
                      </Button>
                    </div>
                  </div>
                </article>

                {...word.meanings.map((meaning, index) => (
                  <article
                    className="mb-5"
                    key={`${meaning.partOfSpeech}-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <h4>{meaning.partOfSpeech}</h4>
                      <Separator
                        orientation="horizontal"
                        className="flex-grow"
                      />
                    </div>

                    <h5>Meaning</h5>
                    <div>
                      {meaning.definitions.map((definition, index) => {
                        return (
                          <CustomBullet definition={definition} key={index} />
                        );
                      })}
                    </div>
                  </article>
                ))}
              </section>
            );
          })}
      </main>

      <footer className="py-5">
        <Separator orientation="horizontal" className="mb-5" />

        {data && (
          <div>
            <h5>Source</h5>
            <a
              href={data[0].sourceUrls[0]}
              className="underline"
              target="_blank"
            >
              {data[0].sourceUrls[0]}
            </a>
          </div>
        )}
      </footer>
    </ScrollArea>
  );
};

export default Home;
