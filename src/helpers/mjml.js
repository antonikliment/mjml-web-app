import { mjmlRemote } from 'api-client'

export default async function(mjmlContent) {
  const { html, errors } = await mjmlRemote(mjmlContent)
  return { html, errors };
  /*
  (mjmlContent, filePath, mjmlPath = null, options = {})
  return new Promise(resolve => {
    window.requestIdleCallback(async () => {
      console.error("broken", mjmlContent);
      try {
        const settings = await storageGet('settings')
        const useMjmlConfig = get(settings, 'mjml.useMjmlConfig')
        const mjmlConfigPath = get(settings, 'mjml.mjmlConfigPath')

        if (mjmlPath) {
          let mjmlConfigOption = []
          if (useMjmlConfig) {
            if (mjmlConfigPath) {
              mjmlConfigOption = [`--config.mjmlConfigPath=${settings.mjml.mjmlConfigPath}`]
            } else {
              mjmlConfigOption = [`--config.mjmlConfigPath=${path.dirname(filePath)}`]
            }
          }

          const args = [
            '-s',
            '--config.validationLevel=skip',
            ...(options.minify ? ['-m'] : []),
            ...mjmlConfigOption,
          ]

          if (!mjmlContent.trim().startsWith('<mjml')) {
            const stdinStream = new stream.Readable()
            stdinStream.push(wrapIntoMJMLTags(mjmlContent))
            stdinStream.push(null)
            args.push('-i')

            const res = await execFile(mjmlPath, args, { maxBuffer: 500 * 1024 }, stdinStream)
            if (res.err) {
              return resolve({ html: '', errors: [] })
            }

            resolve({ html: res.stdout, errors: [] })
          } else {
            const res = await exec(`${mjmlPath} "${filePath}" ${args.join(' ')}`, {
              maxBuffer: 500 * 1024,
            })

            if (res.err) {
              return resolve({ html: '', errors: [] })
            }

            resolve({ html: res.stdout, errors: [] })
          }
        } else {
          if (!mjmlContent.trim().startsWith('<mjml')) {
            mjmlContent = wrapIntoMJMLTags(mjmlContent)
          }

          const mjmlOptions = {
            filePath,
            minify: !!options.minify,
            mjmlConfigPath: useMjmlConfig
              ? settings.mjml.mjmlConfigPath || path.dirname(filePath)
              : null,
          }
          console.error("broken", mjmlContent);
          // const res = mjml2html(mjmlContent, mjmlOptions)
          const res = {}
          resolve({ html: res.html || '', errors: res.errors || [] })
        }
      } catch (e) {
        resolve({ html: '', errors: [] })
      }
    })
  })
  */
}

export function wrapIntoMJMLTags(content) {
  return `<mjml>
  <mj-body>
    ${content}
  </mj-body>
</mjml>`
}

export function migrateToMJML4(content) {
  console.error("Not implemented")
  //return migrate(content)
}
